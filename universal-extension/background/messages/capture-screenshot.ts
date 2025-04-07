import type { PlasmoMessaging } from "@plasmohq/messaging"
import { getCurrentTabUrl } from "../utils/getCurrentTabUrl"

// Request body type
export interface RequestBody {
  tabId: number
  screenshotPath?: string
}

// Response body type
export interface ResponseBody {
  success: boolean
  data?: string
  error?: string
}

/**
 * Message handler for capturing a screenshot of a tab
 */
const handler: PlasmoMessaging.MessageHandler<RequestBody, ResponseBody> = async (
  req,
  res
) => {
  const { tabId, screenshotPath } = req.body
  
  try {
    console.log("Background: Capture screenshot request received for tab", tabId)
    
    // First get the URL using our utility function
    const url = await getCurrentTabUrl(tabId)
    
    if (!url) {
      throw new Error("Unable to get tab information")
    }
    
    // Make sure we're not trying to capture a chrome:// or chrome-extension:// URL
    if (url.startsWith("chrome://") || url.startsWith("chrome-extension://")) {
      throw new Error("Cannot capture screenshot of chrome:// or extension pages")
    }
    
    // Get the tab to find its window ID
    const tab = await chrome.tabs.get(tabId)
    if (!tab) {
      throw new Error("Tab not found")
    }

    console.log("Background: Tab found, window ID:", tab.windowId)
    
    // Use a callback-based approach to avoid promise scope issues
    chrome.tabs.captureVisibleTab(
      tab.windowId,
      { format: "png" },
      (dataUrl) => {
        if (chrome.runtime.lastError) {
          console.error("Background: Error capturing screenshot:", chrome.runtime.lastError)
          res.send({
            success: false,
            error: chrome.runtime.lastError.message || "Failed to capture screenshot"
          })
          return
        }
        
        console.log("Background: Screenshot captured successfully, data URL length:", dataUrl?.length || 0)
        
        // Send the success response with the image data
        res.send({
          success: true,
          data: dataUrl
        })
      }
    )
  } catch (error) {
    console.error("Background: Error capturing screenshot:", error)
    res.send({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
}

export default handler
