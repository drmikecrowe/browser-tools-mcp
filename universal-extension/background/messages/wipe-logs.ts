/**
 * Message handler for wiping logs from the server
 */
import type { PlasmoMessaging } from "@plasmohq/messaging"
import type { Messages } from "~messaging/plasmoMessaging"
import { browserConnectorSettings } from ".."
import { wipeLogs } from '../../server/api';

/**
 * Handler for the wipe-logs message
 * Sends a request to the server to clear all logs
 */
const handler: PlasmoMessaging.MessageHandler<
  Messages.WipeLogsRequest,
  Messages.WipeLogsResponse
> = async (req, res) => {
  // Get server host and port from request or use defaults from settings
  const serverHost = req.body.serverHost || browserConnectorSettings.serverHost
  const serverPort = req.body.serverPort || browserConnectorSettings.serverPort
  
  try {
    console.log(`Background: Wiping logs from ${serverHost}:${serverPort}`)
    
    // Build the server URL for wiping logs
    const serverUrl = `http://${serverHost}:${serverPort}/wipelogs`
    
    // Send request to wipe logs
    const data = await wipeLogs(serverUrl, {});
    
    console.log("Background: Logs wiped successfully:", data)
    
    // Send successful response
    res.send({
      success: true,
      message: "Logs wiped successfully"
    })
  } catch (error) {
    console.error("Background: Error wiping logs:", error)
    
    // Send error response
    res.send({
      success: false,
      message: error instanceof Error ? error.message : String(error)
    })
  }
}

export default handler
