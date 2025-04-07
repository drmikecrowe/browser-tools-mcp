import { sendToContentScript } from "@plasmohq/messaging"
import { type PlasmoMessaging } from "@plasmohq/messaging"

/**
 * Setup the screenshot handler for the background script
 */
export function setupScreenshotHandler() {
  console.log("Background: Setting up screenshot handler")

  // Register handler for screenshot capture requests
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "capture-screenshot") {
      handleCaptureScreenshot(message, sender, sendResponse)
      return true // Keep the message channel open for the async response
    } else if (message.type === "take-screenshot") {
      handleTakeScreenshot(message, sender, sendResponse)
      return true // Keep the message channel open for the async response
    }
    return false
  })
}

/**
 * Handle a request to capture a screenshot
 * @param message The message
 * @param sender The sender
 * @param sendResponse The response callback
 */
async function handleCaptureScreenshot(
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void
) {
  console.log("Background: Handling screenshot capture request", message)

  try {
    // Get the tab ID from the message
    const tabId = message.tabId || sender.tab?.id

    if (!tabId) {
      console.error("Background: No tab ID provided for screenshot capture")
      sendResponse({
        success: false,
        error: "No tab ID provided for screenshot capture"
      })
      return
    }

    // Capture the screenshot
    chrome.tabs.captureVisibleTab(
      { format: "png", quality: 100 },
      (dataUrl) => {
        if (chrome.runtime.lastError) {
          console.error(
            "Background: Error capturing screenshot:",
            chrome.runtime.lastError
          )
          sendResponse({
            success: false,
            error: chrome.runtime.lastError.message
          })
          return
        }

        console.log(
          "Background: Screenshot captured successfully, data URL length:",
          dataUrl?.length || 0
        )
        sendResponse({
          success: true,
          data: dataUrl,
          path: message.screenshotPath || ""
        })
      }
    )
  } catch (error) {
    console.error("Background: Error in screenshot capture:", error)
    sendResponse({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
}

/**
 * Handle a request to take a screenshot
 * @param message The message
 * @param sender The sender
 * @param sendResponse The response callback
 */
async function handleTakeScreenshot(
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void
) {
  console.log("Background: Handling take-screenshot request", message)

  try {
    // Get the tab ID from the message
    const tabId = message.tabId || sender.tab?.id

    if (!tabId) {
      console.error("Background: No tab ID provided for screenshot capture")
      sendResponse({
        success: false,
        error: "No tab ID provided for screenshot capture"
      })
      return
    }

    // Get the tab to find its window ID
    chrome.tabs.get(tabId, (tab) => {
      if (chrome.runtime.lastError) {
        console.error("Background: Error getting tab:", chrome.runtime.lastError)
        sendResponse({
          success: false,
          error: chrome.runtime.lastError.message || "Failed to get tab information"
        })
        return
      }

      if (!tab) {
        console.error("Background: Tab not found")
        sendResponse({
          success: false,
          error: "Tab not found"
        })
        return
      }

      // Capture the screenshot
      chrome.tabs.captureVisibleTab(
        tab.windowId,
        { format: "png", quality: 100 },
        (dataUrl) => {
          if (chrome.runtime.lastError) {
            console.error(
              "Background: Error capturing screenshot:",
              chrome.runtime.lastError
            )
            sendResponse({
              success: false,
              error: chrome.runtime.lastError.message || "Failed to capture screenshot"
            })
            return
          }

          console.log(
            "Background: Screenshot captured successfully, data URL length:",
            dataUrl?.length || 0
          )
          sendResponse({
            success: true,
            data: dataUrl,
            path: message.screenshotPath || ""
          })
        }
      )
    })
  } catch (error) {
    console.error("Background: Error in screenshot capture:", error)
    sendResponse({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
}

/**
 * Handler for the capture-screenshot message from the devtools panel
 */
export const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("Background: Received capture-screenshot message", req)

  try {
    // Get the tab ID from the request
    const tabId = req.body.tabId

    if (!tabId) {
      console.error("Background: No tab ID provided for screenshot capture")
      res.send({
        success: false,
        error: "No tab ID provided for screenshot capture"
      })
      return
    }

    // Capture the screenshot
    chrome.tabs.captureVisibleTab(
      { format: "png", quality: 100 },
      (dataUrl) => {
        if (chrome.runtime.lastError) {
          console.error(
            "Background: Error capturing screenshot:",
            chrome.runtime.lastError
          )
          res.send({
            success: false,
            error: chrome.runtime.lastError.message
          })
          return
        }

        console.log(
          "Background: Screenshot captured successfully, data URL length:",
          dataUrl?.length || 0
        )
        res.send({
          success: true,
          data: dataUrl,
          path: req.body.screenshotPath || ""
        })
      }
    )
  } catch (error) {
    console.error("Background: Error in screenshot capture:", error)
    res.send({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
}
