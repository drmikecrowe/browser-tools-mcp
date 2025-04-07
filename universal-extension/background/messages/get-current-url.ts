import type { PlasmoMessaging } from "@plasmohq/messaging"
import { getCurrentTabUrl } from "../utils/getCurrentTabUrl"

// Request body type
export interface RequestBody {
  tabId: number
}

// Response body type
export interface ResponseBody {
  success: boolean
  url?: string
  error?: string
}

/**
 * Message handler for getting the current URL of a tab
 */
const handler: PlasmoMessaging.MessageHandler<RequestBody, ResponseBody> = async (
  req,
  res
) => {
  const { tabId } = req.body
  
  try {
    // Use the centralized utility function that has caching and fallback mechanisms
    const url = await getCurrentTabUrl(tabId)
    
    if (!url) {
      throw new Error("Unable to get URL for the tab")
    }
    
    // Return the URL
    res.send({
      success: true,
      url: url
    })
  } catch (error) {
    console.error("Error getting current URL:", error)
    res.send({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
}

export default handler
