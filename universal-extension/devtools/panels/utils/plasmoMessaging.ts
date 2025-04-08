/**
 * Utilities for Plasmo messaging
 */
import { sendToBackground } from "@plasmohq/messaging"

// Define message types for Plasmo type safety
declare namespace MessagesMetadata {
  interface ScreenshotRequest {
    tabId: number
    screenshotPath: string
  }
  
  interface ScreenshotResponse {
    success: boolean
    data?: string
    title?: string
    path?: string
    error?: string
  }
}

// Message names as constants - using kebab-case to match existing naming convention
export const MessageNames = {
  CAPTURE_SCREENSHOT: "capture-screenshot",
  WIPE_LOGS: "wipe-logs",
  SEND_TO_CONNECTOR: "send-to-connector"
} as const

// Message interface types
export interface CaptureScreenshotRequest {
  tabId: number
  screenshotPath: string
}

export interface CaptureScreenshotResponse {
  success: boolean
  data?: string
  title?: string
  path?: string
  error?: string
}

/**
 * Capture a screenshot using Plasmo messaging
 */
export async function captureScreenshot(
  tabId: number,
  screenshotPath: string
): Promise<CaptureScreenshotResponse> {
  try {
    // Using type assertion as a temporary solution
    // until proper MessagesMetadata types are set up
    const response = await sendToBackground({
      name: "capture-screenshot" as any,
      body: {
        tabId,
        screenshotPath
      } as CaptureScreenshotRequest
    })

    return response as CaptureScreenshotResponse
  } catch (error) {
    console.error("Error in captureScreenshot:", error)
    return {
      success: false,
      error: error.message || "Unknown error capturing screenshot"
    }
  }
}

/**
 * Wipe logs using Plasmo messaging
 */
export async function wipeLogs(): Promise<{ success: boolean }> {
  try {
    // Using type assertion as a temporary solution
    const response = await sendToBackground({
      name: "wipe-logs" as any
    })
    
    return response
  } catch (error) {
    console.error("Error in wipeLogs:", error)
    return { success: false }
  }
}
