// Import the shared settings store
import type { BrowserConnectorSettings } from "../store/browserConnectorSettings"
import {
  getSettings,
  onSettingsChanged
} from "../store/browserConnectorSettings"
import { setupTabTracking } from "./tabs"
import { setupConnectionStatusPort, sendConnectionStatus, broadcastConnectionStatus } from "./ports/connection-status"
import { MessageName } from "~messaging/plasmoMessaging"

// Global state for background script
export let isConnectedToServer = false
export let browserConnectorSettings: BrowserConnectorSettings

// Initialize settings
getSettings().then((settings) => {
  browserConnectorSettings = settings

  // Initialize tab tracking and other services after settings are loaded
  initializeBackgroundServices()
})

// Listen for settings changes
onSettingsChanged((settings) => {
  browserConnectorSettings = settings
})

/**
 * Initialize all background services
 */
function initializeBackgroundServices() {
  console.log("Background: Initializing background services")

  // Setup tab tracking
  setupTabTracking()

  // Listen for legacy messages (WebSocket connection state)
  setupLegacyMessageListeners()

  // Setup port messaging listeners
  setupPortMessagingListeners()

  console.log("Background: Background services initialized")
}

/**
 * Set up listeners for legacy messages that haven't been migrated to Plasmo handlers
 * This primarily handles WebSocket connection state messages
 */
function setupLegacyMessageListeners() {
  console.log("Background: Setting up legacy message listeners")

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Handle connection status updates
    if (message.type === "connection-status-update") {
      console.log(
        `Background: Connection status update: ${
          message.connected ? "connected" : "disconnected"
        }`
      )

      // Update global state
      isConnectedToServer = message.connected

      // Forward to port-based system if a tab ID is provided
      if (message.tabId) {
        try {
          // Send to specific tab that reported the status
          sendConnectionStatus(message.tabId, message.connected, message.serverInfo)
          
          // Also broadcast to all other tabs for synchronized status
          broadcastConnectionStatus(message.connected, message.serverInfo)
        } catch (error) {
          console.error("Background: Error forwarding connection status:", error)
        }
      }

      // Acknowledge message
      sendResponse({ acknowledged: true })
      return true // Keep message channel open for async response
    }

    // Other legacy message handlers can be added here

    return false // We didn't handle this message
  })
}

/**
 * Set up listeners for port-based messaging
 * This handles long-lived connections with the devtools panel
 */
function setupPortMessagingListeners() {
  console.log("Background: Setting up port messaging listeners")
  
  // Set up connection status port handler
  setupConnectionStatusPort()
}

/**
 * Note on Plasmo Message Handlers:
 * 
 * Plasmo automatically registers all message handlers in the background/messages directory.
 * Each handler file should be named to match the MessageName enum values in plasmoMessaging.ts.
 * 
 * For example:
 * - MessageName.CAPTURE_SCREENSHOT = "capture-screenshot" -> background/messages/capture-screenshot.ts
 * - MessageName.SERVER_VALIDATION = "server-validation" -> background/messages/server-validation.ts
 * 
 * New handlers implemented:
 * - server-validation.ts: Validates server identity
 * - wipe-logs.ts: Clears logs from the server
 * - send-to-connector.ts: Sends data to browser connector
 */

export {}
