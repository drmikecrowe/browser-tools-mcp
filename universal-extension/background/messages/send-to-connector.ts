/**
 * Message handler for sending data to the browser connector
 */
import type { PlasmoMessaging } from "@plasmohq/messaging"
import type { Messages } from "~messaging/plasmoMessaging"
import { browserConnectorSettings } from ".."
import { validateServerIdentity } from "~devtools/utils/validateServerIdentity"

/**
 * Process any nested JSON strings in the data
 */
function processJsonString(obj: any): any {
  if (!obj) return obj;

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => processJsonString(item));
  }

  // Handle objects
  if (typeof obj === 'object') {
    const result = { ...obj };
    for (const key in result) {
      if (typeof result[key] === 'string') {
        try {
          // Try to parse as JSON
          if (result[key].startsWith('{') || result[key].startsWith('[')) {
            const parsed = JSON.parse(result[key]);
            result[key] = parsed;
          }
        } catch (e) {
          // Not valid JSON, leave as is
        }
      } else if (typeof result[key] === 'object') {
        // Recursively process nested objects
        result[key] = processJsonString(result[key]);
      }
    }
    return result;
  }

  return obj;
}

/**
 * Handler for the send-to-connector message
 * Sends data to the browser connector server
 */
const handler: PlasmoMessaging.MessageHandler<
  Messages.SendToConnectorRequest,
  Messages.SendToConnectorResponse
> = async (req, res) => {
  const { type, data, tabId } = req.body
  
  try {
    console.log("Background: Sending to browser connector:", { type, tabId })
    
    // Basic validation
    if (!type || !data) {
      throw new Error("Missing required fields: type and data")
    }
    
    // Process any nested JSON strings
    const processedData = processJsonString(data)
    
    // Build the server URL
    const serverUrl = `http://${browserConnectorSettings.serverHost}:${browserConnectorSettings.serverPort}/api/log`
    
    // Send the data to the server
    const response = await fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type,
        ...processedData,
        timestamp: processedData.timestamp || Date.now(),
        tabId
      })
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }
    
    const responseData = await response.json()
    console.log("Background: Data sent successfully:", responseData)
    
    // Send successful response
    res.send({
      success: true
    })
  } catch (error) {
    console.error("Background: Error sending to browser connector:", error)
    
    // Send error response
    res.send({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
}

export default handler
