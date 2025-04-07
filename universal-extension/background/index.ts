// Import the shared settings store
import type { BrowserConnectorSettings } from "../store/browserConnectorSettings"
import {
  getSettings,
  onSettingsChanged
} from "../store/browserConnectorSettings"
import { setupMessageHandlers } from "./messages"
import { setupScreenshotHandler } from "./screenshots"
import { setupTabTracking } from "./tabs"

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

  // Setup screenshot handler
  setupScreenshotHandler()

  // Setup message handlers
  setupMessageHandlers()

  // Listen for legacy messages (WebSocket connection state)
  setupLegacyMessageListeners()

  console.log("Background: Background services initialized")
}

/**
 * Set up listeners for legacy messages that haven't been migrated to Plasmo handlers
 * This primarily handles WebSocket connection state messages
 */
function setupLegacyMessageListeners() {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Track WebSocket connection state
    if (message.type === "WEBSOCKET_CONNECTED") {
      console.log("Background: WebSocket connected to server")
      isConnectedToServer = true
      return false
    }

    if (
      message.type === "WEBSOCKET_CLOSED" ||
      message.type === "SERVER_VALIDATION_FAILED"
    ) {
      console.log("Background: WebSocket disconnected from server")
      isConnectedToServer = false
      return false
    }

    return false
  })
}

export {}
