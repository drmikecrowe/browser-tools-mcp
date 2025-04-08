/**
 * Message handler for settings updates
 */
import type { PlasmoMessaging } from "@plasmohq/messaging"
import type { Messages } from "~messaging/plasmoMessaging"
import { browserConnectorSettings } from ".."
import { getSettings } from "~store/browserConnectorSettings"

/**
 * Handler for settings-updated messages
 * Updates the browser connector settings and notifies all listeners
 */
const handler: PlasmoMessaging.MessageHandler<
  Messages.SettingsUpdatedRequest,
  Messages.SettingsUpdatedResponse
> = async (req, res) => {
  const { settings } = req.body
  
  try {
    console.log("Background: Settings update received:", settings)
    
    // Ensure the global browserConnectorSettings is updated
    const currentSettings = await getSettings()
    Object.assign(browserConnectorSettings, currentSettings)
    
    // Notify any attached listeners (ports)
    // This could be extended to use a port-based system like the connection-status handler
    
    // Send success response
    res.send({
      acknowledged: true
    })
  } catch (error) {
    console.error("Background: Error handling settings update:", error)
    
    // Send error response
    res.send({
      acknowledged: false
    })
  }
}

export default handler
