import { browserConnectorSettings, isConnectedToServer } from ".."
import { validateServerIdentity } from "../../devtools/utils/validateServerIdentity"

/**
 * Test connection to server when a page is refreshed
 * @param tabId Tab ID
 */
export async function retestConnectionOnRefresh(tabId: number): Promise<void> {
  // Skip if we're already connected
  if (isConnectedToServer) {
    return
  }

  console.log(
    `Background: Testing server connection after page refresh for tab ${tabId}`
  )

  try {
    // Try to validate server identity
    const isValid = await validateServerIdentity(browserConnectorSettings)

    if (isValid) {
      console.log(
        "Background: Server validated after page refresh, notifying devtools panel"
      )

      // Notify devtools panel that server is valid
      chrome.runtime.sendMessage({
        type: "SERVER_VALIDATION_SUCCEEDED",
        tabId: tabId
      })

      // Let the devtools panel handle reconnecting the WebSocket
      // We don't set isConnectedToServer here because we need to wait for the
      // WebSocket to actually connect
    } else {
      console.log("Background: Server validation failed after page refresh")
    }
  } catch (error) {
    console.error(
      "Background: Error validating server after page refresh:",
      error
    )
  }
}
