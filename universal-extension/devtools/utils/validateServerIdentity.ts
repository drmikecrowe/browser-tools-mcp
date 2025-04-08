import type { BrowserConnectorSettings } from "~store/browserConnectorSettings"
import { validateServer } from "~messaging/plasmoMessaging"

/**
 * Validates the server identity by checking if it's responding at the given host/port
 * 
 * @param settings The browser connector settings with host and port
 * @returns Promise that resolves to true if the server is valid, false otherwise
 */
export async function validateServerIdentity(
  settings: BrowserConnectorSettings
): Promise<boolean> {
  try {
    console.log(
      `Validating server identity at ${settings.serverHost}:${settings.serverPort}`
    )

    const response = await validateServer(
      settings.serverHost,
      settings.serverPort
    )

    if (response.success) {
      console.log("Server validation succeeded")

      // If we have server info, log it
      if (response.serverInfo) {
        console.log(
          `Connected to ${response.serverInfo.name} v${response.serverInfo.version}`
        )
      }

      return true
    } else {
      console.error("Server validation failed:", response.error)
      return false
    }
  } catch (error) {
    console.error("Error validating server identity:", error)
    return false
  }
}
