/**
 * Server validation message handler for background script
 */
import type { PlasmoMessaging } from "@plasmohq/messaging"
import type { Messages } from "~messaging/plasmoMessaging"
import { browserConnectorSettings } from ".."

/**
 * Handler for the server-validation message
 * Validates if a server is responding with the correct signature at the given host/port
 */
const handler: PlasmoMessaging.MessageHandler<
  Messages.ServerValidationRequest,
  Messages.ServerValidationResponse
> = async (req, res) => {
  const { host, port } = req.body
  
  try {
    console.log(`Background: Validating server at ${host}:${port}`)
    const serverUrl = `http://${host}:${port}/.identity`
    
    // Use fetch with a timeout to prevent long-hanging requests
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      controller.abort()
      console.error(`Background: Timeout validating server at ${serverUrl}`)
    }, 10000) // 10 second timeout
    
    try {
      const response = await fetch(serverUrl, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        },
        cache: 'no-store',
        mode: 'cors',
        credentials: 'omit'
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`)
      }
      
      const responseText = await response.text()
      console.log(`Background: Raw server response: ${responseText}`)
      
      const identity = JSON.parse(responseText)
      
      // Check for correct signature
      if (identity.signature !== "mcp-browser-connector-24x7") {
        throw new Error(`Invalid signature: ${identity.signature}`)
      }
      
      console.log(`Background: Server identity confirmed: ${identity.name} v${identity.version}`)
      
      // Send successful response with server info
      res.send({
        success: true,
        serverInfo: {
          name: identity.name,
          version: identity.version
        }
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error(`Background: Fetch error for ${serverUrl}:`, fetchError)
      throw fetchError
    }
  } catch (error) {
    console.error("Background: Server validation failed:", error)
    
    // Send error response
    res.send({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
}

export default handler
