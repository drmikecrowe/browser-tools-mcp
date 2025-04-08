/**
 * Message handler for connection status updates
 * This receives connection status updates from the WebSocketManager
 * and broadcasts them to all connected devtools panels
 */
import type { PlasmoMessaging } from "@plasmohq/messaging"
import { broadcastConnectionStatus, sendConnectionStatus } from "../port-handlers/connection-status"

// Request body type
export interface RequestBody {
  connected: boolean
  serverInfo?: {
    name: string
    version: string
  }
  tabId: number
}

// Response body type
export interface ResponseBody {
  success: boolean
  error?: string
}

/**
 * Message handler for connection status updates from WebSocketManager
 */
const handler: PlasmoMessaging.MessageHandler<RequestBody, ResponseBody> = async (
  req,
  res
) => {
  const { connected, serverInfo, tabId } = req.body
  
  try {
    console.log(`Background: Received connection status update: ${connected ? "connected" : "disconnected"}`)
    
    if (tabId) {
      // Send to the specific tab that reported the status
      sendConnectionStatus(tabId, connected, serverInfo)
    } else {
      // Broadcast to all connected devtools panels
      broadcastConnectionStatus(connected, serverInfo)
    }
    
    res.send({
      success: true
    })
  } catch (error) {
    console.error("Background: Error handling connection status update:", error)
    res.send({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
}

export default handler
