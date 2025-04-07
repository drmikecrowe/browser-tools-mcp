import { updateServerWithUrl } from "./utils/updateServerWithUrl"
import { browserConnectorSettings, isConnectedToServer } from "./index"

// Map to track tab URLs
export const tabUrls = new Map<number, string>()

/**
 * Setup tab tracking for the background script
 */
export function setupTabTracking() {
  console.log("Background: Setting up tab tracking")

  // Track tab updates
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Only process complete loads with URLs
    if (changeInfo.status === "complete" && tab.url) {
      handleTabUpdate(tabId, tab.url)
    }
  })

  // Track tab activation
  chrome.tabs.onActivated.addListener(async (activeInfo) => {
    try {
      const tab = await chrome.tabs.get(activeInfo.tabId)
      if (tab.url) {
        handleTabActivation(activeInfo.tabId, tab.url)
      }
    } catch (error) {
      console.error("Background: Error getting tab info:", error)
    }
  })

  // Track tab removal
  chrome.tabs.onRemoved.addListener((tabId) => {
    console.log(`Background: Tab ${tabId} removed`)
    tabUrls.delete(tabId)
  })
}

/**
 * Handle a tab update event
 * @param tabId The ID of the tab
 * @param url The URL of the tab
 */
function handleTabUpdate(tabId: number, url: string) {
  console.log(`Background: Tab ${tabId} updated with URL: ${url}`)
  
  // Update our cache
  tabUrls.set(tabId, url)

  // Update server with the new URL if connected
  if (isConnectedToServer && browserConnectorSettings.autoUpdateUrls) {
    updateServerWithUrl(tabId, url, "tab_update")
  }
}

/**
 * Handle a tab activation event
 * @param tabId The ID of the tab
 * @param url The URL of the tab
 */
function handleTabActivation(tabId: number, url: string) {
  console.log(`Background: Tab ${tabId} activated with URL: ${url}`)
  
  // Update our cache
  tabUrls.set(tabId, url)

  // Update server with the new URL if connected
  if (isConnectedToServer && browserConnectorSettings.autoUpdateUrls) {
    updateServerWithUrl(tabId, url, "tab_activation")
  }
}
