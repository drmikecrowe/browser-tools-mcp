// devtools.tsx
import HTML from "url:./panels/panel.html"
import { getPort } from "@plasmohq/messaging/port"

// Keep the existing imports for backwards compatibility during migration
import { defaultSettings } from "../store/browserConnectorSettings"
import { attachDebugger } from "./debugger/attachDebugger"
import { detachDebugger, isDebuggerAttached } from "./debugger/detachDebugger"
import { ConnectionManager } from "./panels/components/connection"
// Import components from our refactored architecture
import { SettingsManager } from "./panels/components/settings"
import type { BrowserConnectorSettings } from "./panels/components/settings"
import { UIManager } from "./panels/components/ui"
import { captureAndSendElement } from "./utils/captureAndSendElement"
import { sendToBrowserConnector } from "./utils/sendToBrowserConnector"
import { wipeLogs } from "./utils/wipeLogs"
import {
  cleanupWebSocketResources,
  handleReconnectAfterPageRefresh,
  setupWebSocket,
  ws
} from "./websocket"

// Port used for connection status updates
let connectionPort: any = null

// Initialize component managers
const settingsManager = new SettingsManager()

// Keep track of debugger state
export const currentTabId = chrome.devtools.inspectedWindow.tabId

// Initialize settings with defaults but use our SettingsManager
export let devtoolsSettings: BrowserConnectorSettings =
  settingsManager.currentSettings

// Function to create the devtools panel
function IndexDevtools() {
  // Panel name appears in chrome://extensions
  const panelName = "BrowserTools MCP"

  try {
    chrome.devtools.panels.create(
      panelName,
      null, // No icon path - Plasmo will handle this
      HTML, // Panel html - import path
      (panel) => {
        console.log(`Panel created: ${panelName}`)

        panel.onShown.addListener((panelWindow) => {
          console.log("DevTools panel shown")
        })

        panel.onHidden.addListener(() => {
          console.log("DevTools panel hidden")
        })
      }
    )
  } catch (e) {
    console.error("Error creating devtools panel:", e)
  }

  // Initialize settings
  initializeDevtools()
}

// Initialize devtools functionality
async function initializeDevtools() {
  try {
    // Load settings using our SettingsManager
    await settingsManager.loadSettings()
    devtoolsSettings = settingsManager.currentSettings
    console.log("DevTools: Initial settings loaded:", devtoolsSettings)

    // Set up WebSocket connection
    await setupWebSocket(devtoolsSettings)

    // Listen for tab refresh to reconnect
    chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
      if (
        tabId === currentTabId &&
        changeInfo.status === "complete" &&
        ws &&
        (ws.readyState === WebSocket.CLOSED ||
          ws.readyState === WebSocket.CLOSING)
      ) {
        console.log("Tab was refreshed, attempting to reconnect WebSocket")
        handleReconnectAfterPageRefresh(devtoolsSettings)
      }
    })

    // Clean up resources when devtools window is closed
    window.addEventListener("beforeunload", () => {
      cleanupWebSocketResources()

      if (isDebuggerAttached()) {
        detachDebugger()
      }
    })

    // Setup connection status handler
    setupConnectionStatusHandler()
  } catch (error) {
    console.error("Error initializing devtools:", error)
  }
}

/**
 * Set up handler for connection status updates using Plasmo port messaging
 */
function setupConnectionStatusHandler() {
  // Clean up any existing port first
  if (connectionPort) {
    try {
      connectionPort.disconnect()
    } catch (e) {
      console.error("Error disconnecting port:", e)
    }
    connectionPort = null
  }
  
  try {
    // Create a connection to the background script using Plasmo port messaging
    // @ts-ignore - Ignoring TypeScript errors with getPort as requested
    connectionPort = getPort("connection-status")
    
    // Connection status message listener
    const messageListener = (message) => {
      if (message && typeof message === "object") {
        const { connected, serverInfo } = message.body || message
        if (typeof connected === "boolean") {
          handleConnectionStatusUpdate(connected, serverInfo)
        }
      }
    }
    
    // Add message listener
    connectionPort.onMessage.addListener(messageListener)
    
    // Handle port disconnection with reconnection logic
    connectionPort.onDisconnect.addListener(() => {
      console.log("Connection status port disconnected. Attempting to reconnect...")
      setTimeout(setupConnectionStatusHandler, 1000)
    })
  } catch (error) {
    console.error("Error setting up connection status port:", error)
  }
}

/**
 * Send a connection status update through the Plasmo port
 */
export function sendConnectionStatus(connected: boolean, serverInfo?: { name: string; version: string }) {
  if (connectionPort) {
    try {
      connectionPort.postMessage({
        body: {
          connected,
          serverInfo,
          tabId: currentTabId,
          timestamp: Date.now()
        }
      })
    } catch (error) {
      console.error("Error sending connection status:", error)
    }
  }
}

/**
 * Handle connection status updates
 */
function handleConnectionStatusUpdate(
  connected: boolean,
  serverInfo?: { name: string; version: string }
) {
  console.log(
    `DevTools received connection status update: ${
      connected ? "connected" : "disconnected"
    }`
  )

  if (serverInfo) {
    console.log(`Connected to ${serverInfo.name} v${serverInfo.version}`)
  }

  // Update UI or take other actions based on connection status
  // This would use our component architecture
}

// Export a default component to satisfy Plasmo's requirements
export default IndexDevtools

// Initialize the devtools panel
IndexDevtools()
