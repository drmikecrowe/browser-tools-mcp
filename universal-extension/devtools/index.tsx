// devtools.js

import HTML from "url:./panels/root/simple-panel.html"

import {
  defaultSettings,
  getSettings,
  onSettingsChanged
} from "../store/browserConnectorSettings"
import type { BrowserConnectorSettings } from "../store/browserConnectorSettings"
import { attachDebugger } from "./debugger/attachDebugger"
import { detachDebugger, isDebuggerAttached } from "./debugger/detachDebugger"
import { captureAndSendElement } from "./utils/captureAndSendElement"
import { sendToBrowserConnector } from "./utils/sendToBrowserConnector"
import { wipeLogs } from "./utils/wipeLogs"
import {
  cleanupWebSocketResources,
  handleReconnectAfterPageRefresh,
  setupWebSocket,
  ws
} from "./websocket"

// Initialize settings with defaults
export let devtoolsSettings: BrowserConnectorSettings = { ...defaultSettings }

// Keep track of debugger state
export const currentTabId = chrome.devtools.inspectedWindow.tabId

// Detect Firefox browser
const isFirefox = navigator.userAgent.includes("Firefox")
console.log("Is Firefox:", isFirefox)

// Create the DevTools panel using Plasmo's recommended approach
chrome.devtools.panels.create(
  "BrowserToolsMCP",
  "",
  // See: https://github.com/PlasmoHQ/plasmo/issues/106#issuecomment-1188539625
  HTML.split("/").pop(),
  (panel) => {
    console.log("DevTools panel created successfully")
    // Initial attach - we'll keep the debugger attached as long as DevTools is open
    attachDebugger()

    // Handle panel showing
    panel.onShown.addListener((panelWindow) => {
      console.log("DevTools panel shown")
      if (!isDebuggerAttached) {
        attachDebugger()
      }
    })
  }
)

// Load settings on startup
console.log("Loading settings...")
getSettings().then((settings) => {
  devtoolsSettings = settings

  // Initialize WebSocket connection when DevTools opens
  setupWebSocket(devtoolsSettings)
})

// Listen for settings updates
onSettingsChanged((settings) => {
  const oldSettings = devtoolsSettings
  devtoolsSettings = settings

  // If server settings changed and we have a WebSocket, reconnect
  if (
    ws &&
    (oldSettings.serverHost !== settings.serverHost ||
      oldSettings.serverPort !== settings.serverPort)
  ) {
    console.log("Server settings changed, reconnecting WebSocket...")
    handleReconnectAfterPageRefresh(settings)
  }
})

// Listen for page refreshes
chrome.devtools.network.onNavigated.addListener((url) => {
  console.log("Page navigated/refreshed - wiping logs")
  wipeLogs()

  // Send the new URL to the server
  if (ws && ws.readyState === WebSocket.OPEN && url) {
    console.log("Chrome Extension: Sending page-navigated event with URL:", url)
    ws.send(
      JSON.stringify({
        type: "page-navigated",
        url: url,
        tabId: chrome.devtools.inspectedWindow.tabId,
        timestamp: Date.now()
      })
    )
  }
})

// 1) Listen for network requests
chrome.devtools.network.onRequestFinished.addListener((request) => {
  if (request._resourceType === "xhr" || request._resourceType === "fetch") {
    request.getContent((responseBody) => {
      const entry = {
        type: "network-request",
        url: request.request.url,
        method: request.request.method,
        status: request.response.status,
        requestHeaders: request.request.headers,
        responseHeaders: request.response.headers,
        requestBody: request.request.postData?.text ?? "",
        responseBody: responseBody ?? ""
      }
      sendToBrowserConnector(entry)
    })
  }
})

// Listen for element selection in the Elements panel
chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
  captureAndSendElement()
})

// Clean up when DevTools closes
window.addEventListener("unload", () => {
  // Detach debugger
  detachDebugger()

  // Clean up all WebSocket resources
  cleanupWebSocketResources()
})

// Listen for connection status updates from page refreshes
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle connection status updates from page refreshes
  if (message.type === "CONNECTION_STATUS_UPDATE") {
    console.log(
      `DevTools received connection status update: ${
        message.isConnected ? "Connected" : "Disconnected"
      }`
    )

    // If connection is lost, try to reestablish WebSocket only if we had a previous connection
    if (!message.isConnected && ws) {
      console.log(
        "Connection lost after page refresh, will attempt to reconnect WebSocket"
      )

      // Only reconnect if we actually have a WebSocket that might be stale
      if (
        ws &&
        (ws.readyState === WebSocket.CLOSED ||
          ws.readyState === WebSocket.CLOSING)
      ) {
        console.log("WebSocket is already closed or closing, will reconnect")
        setupWebSocket(devtoolsSettings)
      }
    }
  }

  // Handle auto-discovery requests after page refreshes
  if (message.type === "INITIATE_AUTO_DISCOVERY") {
    console.log(
      `DevTools initiating WebSocket reconnect after page refresh (reason: ${message.reason})`
    )

    // For page refreshes with forceRestart, we should always reconnect if our current connection is not working
    if (
      (message.reason === "page_refresh" || message.forceRestart === true) &&
      (!ws || ws.readyState !== WebSocket.OPEN)
    ) {
      console.log(
        "Page refreshed and WebSocket not open - forcing reconnection"
      )

      // Use the utility function to handle reconnection
      handleReconnectAfterPageRefresh(devtoolsSettings)
    }
  }
})

// Export a default component to satisfy Plasmo's requirements
function IndexDevtools() {
  return <h2>BrowserToolsMCP DevTools Extension</h2>
}

export default IndexDevtools
