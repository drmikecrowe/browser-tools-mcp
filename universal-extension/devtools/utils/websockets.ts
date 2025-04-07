import { validateServerIdentity } from "./validateServerIdentity"

/**
 * WebSocket connection utilities for the DevTools extension
 */

// WebSocket connection management
export let ws: WebSocket | null = null
export let wsReconnectTimeout: NodeJS.Timeout | null = null
export let heartbeatInterval: NodeJS.Timeout | null = null
export const WS_RECONNECT_DELAY = 5000 // 5 seconds
export const HEARTBEAT_INTERVAL = 30000 // 30 seconds
export const WS_CONNECTION_TIMEOUT = 10000 // 10 seconds

// Add a flag to track if we need to reconnect after identity validation
export let reconnectAfterValidation = false
// Track if we're intentionally closing the connection
export let intentionalClosure = false

/**
 * Safely close the WebSocket connection
 */
export function closeWebSocket(): void {
  // Set intentional closure flag before closing
  intentionalClosure = true

  if (ws) {
    try {
      ws.close()
      console.log("WebSocket closed successfully")
    } catch (e) {
      console.error("Error closing WebSocket:", e)
    }
    ws = null
  }
  
  // Reset flag after closing
  intentionalClosure = false
}

/**
 * Clear any pending WebSocket reconnect timeouts
 */
export function clearReconnectTimeout(): void {
  if (wsReconnectTimeout) {
    clearTimeout(wsReconnectTimeout)
    wsReconnectTimeout = null
    console.log("WebSocket reconnect timeout cleared")
  }
}

/**
 * Clear the heartbeat interval
 */
export function clearHeartbeatInterval(): void {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval)
    heartbeatInterval = null
    console.log("WebSocket heartbeat interval cleared")
  }
}

/**
 * Perform complete cleanup of all WebSocket resources
 */
export function cleanupWebSocketResources(): void {
  // Set intentional closure flag before closing
  intentionalClosure = true
  
  // Close the WebSocket connection
  if (ws) {
    try {
      ws.close()
    } catch (e) {
      console.error("Error closing WebSocket during cleanup:", e)
    }
    ws = null
  }
  
  // Clear any pending timeouts
  if (wsReconnectTimeout) {
    clearTimeout(wsReconnectTimeout)
    wsReconnectTimeout = null
  }
  
  // Clear the heartbeat interval
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval)
    heartbeatInterval = null
  }
  
  console.log("All WebSocket resources cleaned up")
}

// Function to send a heartbeat to keep the WebSocket connection alive
function sendHeartbeat() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    console.log("Chrome Extension: Sending WebSocket heartbeat")
    ws.send(JSON.stringify({ type: "heartbeat" }))
  }
}

export async function setupWebSocket(devToolsSettings) {
  // Clear any pending timeouts
  if (wsReconnectTimeout) {
    clearTimeout(wsReconnectTimeout)
    wsReconnectTimeout = null
  }

  if (heartbeatInterval) {
    clearInterval(heartbeatInterval)
    heartbeatInterval = null
  }

  // Close existing WebSocket if any
  if (ws) {
    // Set flag to indicate this is an intentional closure
    intentionalClosure = true
    try {
      ws.close()
    } catch (e) {
      console.error("Error closing existing WebSocket:", e)
    }
    ws = null
    intentionalClosure = false // Reset flag
  }

  // Validate server identity before connecting
  console.log("Validating server identity before WebSocket connection...")
  const isValid = await validateServerIdentity()

  if (!isValid) {
    console.error(
      "Cannot establish WebSocket: Not connected to a valid browser tools server"
    )
    // Set flag to indicate we need to reconnect after a page refresh check
    reconnectAfterValidation = true

    // Try again after delay
    wsReconnectTimeout = setTimeout(() => {
      console.log("Attempting to reconnect WebSocket after validation failure")
      setupWebSocket(devToolsSettings)
    }, WS_RECONNECT_DELAY)
    return
  }

  // Reset reconnect flag since validation succeeded
  reconnectAfterValidation = false

  const wsUrl = `ws://${devToolsSettings.serverHost}:${devToolsSettings.serverPort}/extension-ws`
  console.log(`Connecting to WebSocket at ${wsUrl}`)

  try {
    ws = new WebSocket(wsUrl)

    // Set a connection timeout
    const connectionTimeoutId = setTimeout(() => {
      if (ws && ws.readyState !== WebSocket.OPEN) {
        console.error(
          `WebSocket connection timeout after ${WS_CONNECTION_TIMEOUT}ms`
        )
        // Force close and trigger reconnect
        try {
          ws.close()
        } catch (e) {
          console.error("Error closing timed out WebSocket:", e)
        }
      }
    }, WS_CONNECTION_TIMEOUT)

    ws.onopen = () => {
      // Clear the connection timeout
      clearTimeout(connectionTimeoutId)

      console.log(`Chrome Extension: WebSocket connected to ${wsUrl}`)

      // Start heartbeat to keep connection alive
      heartbeatInterval = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL)

      // Notify that connection is successful
      chrome.runtime.sendMessage({
        type: "WEBSOCKET_CONNECTED",
        serverHost: devToolsSettings.serverHost,
        serverPort: devToolsSettings.serverPort
      })

      // Send the current URL to the server right after connection
      // This ensures the server has the URL even if no navigation occurs
      chrome.runtime.sendMessage(
        {
          type: "GET_CURRENT_URL",
          tabId: chrome.devtools.inspectedWindow.tabId
        },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error(
              "Chrome Extension: Error getting URL from background on connection:",
              chrome.runtime.lastError
            )

            // Send error response since we can't get the URL
            ws.send(
              JSON.stringify({
                type: "current-url-response",
                url: null,
                tabId: chrome.devtools.inspectedWindow.tabId,
                error: "Failed to get URL: " + chrome.runtime.lastError.message,
                requestId: null
              })
            )
            return
          }

          if (response && response.url) {
            console.log(
              "Chrome Extension: Got URL from background:",
              response.url
            )
            ws.send(
              JSON.stringify({
                type: "current-url",
                url: response.url,
                tabId: chrome.devtools.inspectedWindow.tabId,
                timestamp: Date.now()
              })
            )
          } else {
            // If response exists but no URL, try fallback
            console.log(
              "Chrome Extension: Trying fallback method to get URL"
            )
            // Try to get the URL directly using the tabs API
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              if (chrome.runtime.lastError) {
                console.error(
                  "Chrome Extension: Fallback URL retrieval failed:",
                  chrome.runtime.lastError
                )
                return
              }

              const url = tabs && tabs[0] && tabs[0].url
              console.log("Chrome Extension: Got URL directly from tab:", url)

              if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(
                  JSON.stringify({
                    type: "current-url",
                    url: url || null,
                    tabId: chrome.devtools.inspectedWindow.tabId,
                    timestamp: Date.now()
                  })
                )
              } else {
                console.error("Chrome Extension: WebSocket not open to send URL")
              }
            })
          }
        }
      )

      // Fallback method to get URL directly
      function tryFallbackGetUrl() {
        console.log("Chrome Extension: Trying fallback method to get URL")

        // Try to get the URL directly using the tabs API
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (chrome.runtime.lastError) {
            console.error(
              "Chrome Extension: Fallback URL retrieval failed:",
              chrome.runtime.lastError
            )
            return
          }

          const url = tabs && tabs[0] && tabs[0].url
          console.log("Chrome Extension: Got URL directly from tab:", url)

          if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(
              JSON.stringify({
                type: "current-url",
                url: url || null,
                tabId: chrome.devtools.inspectedWindow.tabId,
                timestamp: Date.now()
              })
            )
          } else {
            console.error("Chrome Extension: WebSocket not open to send URL")
          }
        })
      }
    }

    ws.onerror = (error) => {
      // Clear the connection timeout
      clearTimeout(connectionTimeoutId)

      console.error(`Chrome Extension: WebSocket error for ${wsUrl}:`, error)

      // Notify about the WebSocket error
      chrome.runtime.sendMessage({
        type: "WEBSOCKET_ERROR",
        error: "Connection error",
        serverHost: devToolsSettings.serverHost,
        serverPort: devToolsSettings.serverPort
      })
    }

    ws.onclose = (event) => {
      // Clear the connection timeout
      clearTimeout(connectionTimeoutId)

      console.log(`Chrome Extension: WebSocket closed for ${wsUrl}:`, event)

      // Stop heartbeat
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval)
        heartbeatInterval = null
      }

      // Don't reconnect if this was an intentional closure
      if (intentionalClosure) {
        console.log(
          "Chrome Extension: Intentional WebSocket closure, not reconnecting"
        )
        return
      }

      // Only attempt to reconnect if the closure wasn't intentional
      // Code 1000 (Normal Closure) and 1001 (Going Away) are normal closures
      // Code 1005 often happens with clean closures in Chrome
      const isAbnormalClosure = !(event.code === 1000 || event.code === 1001)

      // Check if this was an abnormal closure or if we need to reconnect after validation
      if (isAbnormalClosure || reconnectAfterValidation) {
        console.log(
          `Chrome Extension: Will attempt to reconnect WebSocket (closure code: ${event.code})`
        )

        // Notify about the WebSocket closure
        chrome.runtime.sendMessage({
          type: "WEBSOCKET_CLOSED",
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
          willReconnect: true,
          serverHost: devToolsSettings.serverHost,
          serverPort: devToolsSettings.serverPort
        })

        // Try to reconnect after delay
        wsReconnectTimeout = setTimeout(() => {
          console.log(
            `Chrome Extension: Attempting to reconnect WebSocket to ${wsUrl}`
          )
          setupWebSocket(devToolsSettings)
        }, WS_RECONNECT_DELAY)
      } else {
        console.log(
          `Chrome Extension: Normal WebSocket closure, not reconnecting automatically`
        )

        // Notify about the WebSocket closure
        chrome.runtime.sendMessage({
          type: "WEBSOCKET_CLOSED",
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
          willReconnect: false,
          serverHost: devToolsSettings.serverHost,
          serverPort: devToolsSettings.serverPort
        })
      }
    }

    ws.onmessage = async (event) => {
      try {
        const message = JSON.parse(event.data)

        // Don't log heartbeat responses to reduce noise
        if (message.type !== "heartbeat-response") {
          console.log("Chrome Extension: Received WebSocket message:", message)
        }

        // Handle different message types
        if (message.type === "heartbeat-response") {
          // console.log("Chrome Extension: Received heartbeat response");
        } else if (message.type === "take-screenshot") {
          console.log("Chrome Extension: Taking screenshot...")

          // Notify that we're processing a screenshot request
          chrome.runtime.sendMessage({
            type: "SCREENSHOT_REQUESTED",
            requestId: message.requestId
          })

          // Capture screenshot of the current tab
          chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
            if (chrome.runtime.lastError) {
              console.error(
                "Chrome Extension: Screenshot capture failed:",
                chrome.runtime.lastError
              )

              // Send error to server via WebSocket
              if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(
                  JSON.stringify({
                    type: "screenshot-error",
                    error: chrome.runtime.lastError.message,
                    requestId: message.requestId
                  })
                )
              } else {
                console.error(
                  "Chrome Extension: WebSocket not open to send screenshot error"
                )
              }

              // Also notify background script about the failure
              chrome.runtime.sendMessage({
                type: "SCREENSHOT_FAILED",
                error: chrome.runtime.lastError.message,
                requestId: message.requestId
              })

              return
            }

            console.log("Chrome Extension: Screenshot captured successfully")

            // Just send the screenshot data, let the server handle paths
            const response = {
              type: "screenshot-data",
              data: dataUrl,
              requestId: message.requestId,
              // Only include path if it's configured in settings
              ...(devToolsSettings.screenshotPath && {
                path: devToolsSettings.screenshotPath
              }),
              // Include auto-paste setting
              autoPaste: devToolsSettings.allowAutoPaste
            }

            console.log("Chrome Extension: Sending screenshot data response", {
              ...response,
              data: "[base64 data]"
            })

            // Check WebSocket state before sending
            if (ws && ws.readyState === WebSocket.OPEN) {
              try {
                ws.send(JSON.stringify(response))

                // Notify background script about success
                chrome.runtime.sendMessage({
                  type: "SCREENSHOT_SUCCEEDED",
                  requestId: message.requestId
                })
              } catch (error) {
                console.error(
                  "Chrome Extension: Error sending screenshot data:",
                  error
                )

                // Notify background script about the failure
                chrome.runtime.sendMessage({
                  type: "SCREENSHOT_FAILED",
                  error: "Failed to send screenshot data: " + error.message,
                  requestId: message.requestId
                })
              }
            } else {
              console.error(
                `Chrome Extension: WebSocket not open to send screenshot data (state: ${ws ? ws.readyState : "null"})`
              )

              // Notify background script about the failure
              chrome.runtime.sendMessage({
                type: "SCREENSHOT_FAILED",
                error: "WebSocket not open to send screenshot data",
                requestId: message.requestId
              })
            }
          })
        } else if (message.type === "get-current-url") {
          console.log("Chrome Extension: Received request for current URL")
          chrome.runtime.sendMessage(
            {
              type: "GET_CURRENT_URL",
              tabId: chrome.devtools.inspectedWindow.tabId
            },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error(
                  "Chrome Extension: Error getting URL from background:",
                  chrome.runtime.lastError
                )

                // Send error response since we can't get the URL
                ws.send(
                  JSON.stringify({
                    type: "current-url-response",
                    url: null,
                    tabId: chrome.devtools.inspectedWindow.tabId,
                    error: "Failed to get URL: " + chrome.runtime.lastError.message,
                    requestId: message.requestId
                  })
                )
                return
              }

              // Successfully got URL from background script
              console.log("Chrome Extension: Got URL from background:", response.url)
              
              ws.send(
                JSON.stringify({
                  type: "current-url-response",
                  url: response.url,
                  tabId: chrome.devtools.inspectedWindow.tabId,
                  requestId: message.requestId
                })
              )
            }
          )
        }
      } catch (error) {
        console.error(
          "Chrome Extension: Error processing WebSocket message:",
          error
        )
      }
    }
  } catch (error) {
    console.error("Error creating WebSocket:", error)
    // Try again after delay
    wsReconnectTimeout = setTimeout(() => {
      setupWebSocket(devToolsSettings)
    }, WS_RECONNECT_DELAY)
  }
}

/**
 * Close existing WebSocket connection and reset state
 */
export function closeExistingWebSocket(): void {
  if (ws) {
    console.log("Closing existing WebSocket")
    intentionalClosure = true // Mark as intentional to prevent auto-reconnect
    try {
      ws.close()
    } catch (e) {
      console.error("Error closing WebSocket:", e)
    }
    ws = null
    intentionalClosure = false // Reset flag
  }
}

/**
 * Handle reconnection after page refresh
 * @param settings DevTools settings object
 */
export function handleReconnectAfterPageRefresh(settings: any): void {
  // Close existing WebSocket if any
  closeExistingWebSocket()
  
  // Clear any pending reconnect timeouts
  clearReconnectTimeout()
  
  // Try to reestablish the WebSocket connection
  setupWebSocket(settings)
}
