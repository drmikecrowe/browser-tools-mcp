import { browserConnectorSettings, isConnectedToServer } from "../index"
import { tabUrls } from "../tabs"

/**
 * Set up screenshot handler for the background script
 */
export function setupScreenshotHandler(): void {
  console.log("Background: Setting up screenshot handler")

  // Listen for screenshot capture requests
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "CAPTURE_SCREENSHOT" && message.tabId) {
      console.log("Background: Received screenshot capture request")

      // Check if we're connected to the server
      if (!isConnectedToServer) {
        console.error(
          "Cannot capture screenshot: Not connected to a valid browser tools server"
        )
        sendResponse({
          success: false,
          error:
            "Not connected to a valid browser tools server. Please check your connection settings."
        })
        return true // Keep the sendResponse function valid
      }

      // Continue with screenshot capture
      captureAndSendScreenshot(message, browserConnectorSettings, sendResponse)
      return true // Keep the sendResponse function valid
    }
    return false
  })

  console.log("Background: Screenshot handler setup complete")
}

/**
 * Capture and send a screenshot
 * @param message Message containing the request info
 * @param settings Browser connector settings
 * @param sendResponse Function to send the response
 */
export async function captureAndSendScreenshot(
  message,
  settings,
  sendResponse
): Promise<void> {
  try {
    // Get the tab to capture
    const tab = await chrome.tabs.get(message.tabId)
    if (chrome.runtime.lastError) {
      throw new Error(
        `Error getting tab ${message.tabId}: ${chrome.runtime.lastError.message}`
      )
    }

    // Get all windows to find the one containing our tab
    const windows = await chrome.windows.getAll({ populate: true })
    const targetWindow = windows.find((w) => 
      w.tabs.some((t) => t.id === message.tabId)
    )

    if (!targetWindow) {
      throw new Error("Could not find window containing the inspected tab")
    }

    console.log(`Background: Found target window ${targetWindow.id} for screenshot`)

    // Capture screenshot of the window containing the tab
    console.log(`Background: Capturing screenshot of tab ${message.tabId} in window ${targetWindow.id}`)
    const dataUrl = await chrome.tabs.captureVisibleTab(
      targetWindow.id,
      { format: "png" }
    )
    
    if (chrome.runtime.lastError) {
      // Ignore DevTools panel capture error if it occurs
      if (chrome.runtime.lastError.message.includes("devtools://")) {
        console.warn("Background: DevTools panel capture error (expected):", chrome.runtime.lastError)
      } else {
        throw new Error(
          `Screenshot capture failed: ${chrome.runtime.lastError.message}`
        )
      }
    }

    console.log("Background: Screenshot captured successfully")

    // Create response for the original requester
    const response = {
      success: true,
      data: dataUrl,
      url: tab.url || tabUrls.get(message.tabId), // Include the current URL
      requestId: message.requestId,
      ...(settings.screenshotPath && {
        path: settings.screenshotPath
      }),
      autoPaste: settings.allowAutoPaste || false
    }

    // First try to upload directly to the server via HTTP
    let serverUploadSuccess = false;
    try {
      // Send screenshot data to browser connector server
      const serverUrl = `http://${settings.serverHost}:${settings.serverPort}/screenshot`
      console.log(`Background: Sending screenshot to ${serverUrl}`)

      const serverResponse = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: dataUrl,
          path: settings.screenshotPath,
          tabId: message.tabId,
          url: tab.url || tabUrls.get(message.tabId),
          title: tab.title || "Current Tab",
          requestId: message.requestId,
          timestamp: Date.now()
        }),
        // Add a timeout to prevent hanging requests
        signal: AbortSignal.timeout(10000)
      })

      if (!serverResponse.ok) {
        throw new Error(
          `Server returned ${serverResponse.status}: ${serverResponse.statusText}`
        )
      }

      const result = await serverResponse.json()
      if (result.error) {
        throw new Error(`Server error: ${result.error}`)
      }

      console.log("Background: Screenshot saved successfully on server:", result.path)
      serverUploadSuccess = true;
      
      // Update response with server path if available
      if (result.path) {
        response.path = result.path;
      }
    } catch (uploadError) {
      console.error("Background: Error sending screenshot to server directly:", uploadError);
      // We'll continue and send via DevTools as fallback
    }

    // Send the response to the original requester
    sendResponse(response)

    // If direct upload failed, also notify the devtools panel to try via WebSocket
    if (!serverUploadSuccess) {
      console.log("Background: Falling back to DevTools panel for screenshot delivery");
      chrome.runtime.sendMessage({
        type: "SCREENSHOT_DATA",
        ...response,
        // We can still include the data here since this is only a fallback
      })
    } else {
      // Even on direct success, notify DevTools panel but without the data to save bandwidth
      chrome.runtime.sendMessage({
        type: "SCREENSHOT_SUCCEEDED",
        requestId: message.requestId,
        path: response.path
      })
    }

    console.log("Background: Screenshot process completed")
  } catch (error) {
    console.error("Background: Error capturing screenshot:", error)
    
    // Send error response
    sendResponse({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      requestId: message.requestId
    })

    // Also notify the devtools panel about the failure
    chrome.runtime.sendMessage({
      type: "SCREENSHOT_FAILED",
      error: error instanceof Error ? error.message : String(error),
      requestId: message.requestId
    })
  }
}
