import { retestConnectionOnRefresh } from "../utils/retestConnectionOnRefresh"
import { updateServerWithUrl } from "../utils/updateServerWithUrl"

// Track URLs for each tab
export const tabUrls = new Map<number, string>()

/**
 * Initialize tab tracking and event listeners
 */
export function setupTabTracking(): void {
  console.log("Background: Setting up tab tracking")

  // Listen for tab updates to detect page refreshes and URL changes
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Track URL changes
    if (changeInfo.url) {
      console.log(`Background: Tab ${tabId} URL changed to: ${changeInfo.url}`)

      // Update our local cache
      tabUrls.set(tabId, changeInfo.url)

      // Update the server with the new URL
      updateServerWithUrl(tabId, changeInfo.url, "tab_updated")
    }

    // If it's a page refresh (status changed to "loading" without URL change)
    // and there's a URL available in the tab object
    if (
      changeInfo.status === "loading" &&
      !changeInfo.url &&
      tab.url &&
      tab.url !== "chrome://newtab/" &&
      !tab.url.startsWith("chrome:")
    ) {
      console.log(`Background: Tab ${tabId} refreshed, current URL: ${tab.url}`)

      // Get the URL from the tab object or our cache
      const url = tab.url || tabUrls.get(tabId)
      if (url) {
        // Update our local cache
        tabUrls.set(tabId, url)

        // Test server connection on refresh
        retestConnectionOnRefresh(tabId)

        // Update the server with the URL
        updateServerWithUrl(tabId, url, "page_refresh")
      }
    }

    // Also check when a page is completely loaded
    if (changeInfo.status === "complete") {
      console.log(`Background: Tab ${tabId} finished loading, status: complete`)

      // Update URL in our cache and notify server of completion
      if (tab && tab.url) {
        tabUrls.set(tabId, tab.url)
        // Send final URL to server with page_complete status
        updateServerWithUrl(tabId, tab.url, "page_complete")
      }

      // Test connection status again after page is fully loaded
      retestConnectionOnRefresh(tabId)
    }
  })

  // Listen for tab activation (switching between tabs)
  chrome.tabs.onActivated.addListener((activeInfo) => {
    const tabId = activeInfo.tabId
    console.log(`Background: Tab activated: ${tabId}`)

    // Get the URL of the newly activated tab
    chrome.tabs.get(tabId, (tab) => {
      if (chrome.runtime.lastError) {
        console.error(
          "Background: Error getting tab info:",
          chrome.runtime.lastError
        )
        return
      }

      if (tab && tab.url) {
        console.log(`Background: Active tab changed to ${tab.url}`)

        // Update our cache
        tabUrls.set(tabId, tab.url)

        // Send URL update to server if possible
        updateServerWithUrl(tabId, tab.url, "tab_activated")
      }
    })
  })

  // Clean up when tabs are closed
  chrome.tabs.onRemoved.addListener((tabId) => {
    tabUrls.delete(tabId)
  })

  console.log("Background: Tab tracking setup complete")
}
