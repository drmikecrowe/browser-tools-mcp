import { tabUrls } from "~background/tabs"

/**
 * Get the current URL for a tab
 * @param tabId Tab ID
 * @returns Promise that resolves with the URL or null if not available
 */
export async function getCurrentTabUrl(tabId: number): Promise<string | null> {
  console.log(`Background: Getting current URL for tab ${tabId}`)

  // First check our cached URL
  if (tabUrls.has(tabId)) {
    const cachedUrl = tabUrls.get(tabId)
    console.log(`Background: Using cached URL for tab ${tabId}: ${cachedUrl}`)
    return cachedUrl
  }

  // If not in cache, try to get it directly
  try {
    const tab = await chrome.tabs.get(tabId)
    if (chrome.runtime.lastError) {
      console.error(
        `Background: Error getting tab ${tabId}:`,
        chrome.runtime.lastError
      )
      throw new Error(chrome.runtime.lastError.message)
    }

    if (tab && tab.url) {
      console.log(`Background: Got URL for tab ${tabId}: ${tab.url}`)
      tabUrls.set(tabId, tab.url) // Update our cache
      return tab.url
    } else {
      console.log(`Background: No URL found for tab ${tabId}`)
    }
  } catch (error) {
    console.error(
      `Background: Error getting URL for tab ${tabId}:`,
      error.message
    )
  }

  // If we can't get the tab directly, try querying for active tabs
  try {
    console.log(
      `Background: Attempting fallback method to get URL for tab ${tabId}`
    )
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })
    if (tabs && tabs.length > 0 && tabs[0].url) {
      const activeUrl = tabs[0].url
      console.log(`Background: Got URL from active tab fallback: ${activeUrl}`)
      // Cache this URL as well
      tabUrls.set(tabId, activeUrl)
      return activeUrl
    }
  } catch (queryError) {
    console.error(`Background: Error querying tabs:`, queryError)
  }

  console.log(
    `Background: Could not find URL for tab ${tabId} using any method`
  )
  return null
}
