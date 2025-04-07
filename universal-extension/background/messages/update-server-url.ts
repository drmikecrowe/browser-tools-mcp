import type { PlasmoMessaging } from "@plasmohq/messaging"
import { updateServerWithUrl } from "../utils/updateServerWithUrl"

// Request body type
export interface RequestBody {
  tabId: number
  url: string
  source?: string
}

// Response body type
export interface ResponseBody {
  success: boolean
  error?: string
}

/**
 * Message handler for updating the server with a URL
 */
const handler: PlasmoMessaging.MessageHandler<RequestBody, ResponseBody> = async (
  req,
  res
) => {
  const { tabId, url, source = "explicit_update" } = req.body
  
  try {
    await updateServerWithUrl(tabId, url, source)
    
    res.send({
      success: true
    })
  } catch (error) {
    console.error("Error updating server with URL:", error)
    res.send({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
}

export default handler
