import { devtoolsSettings } from "../devtools"

// Validate server identity

export async function validateServerIdentity() {
  try {
    console.log(
      `Validating server identity at http://${devtoolsSettings.serverHost}:${devtoolsSettings.serverPort}/.identity...`
    )

    // Use fetch with a timeout to prevent long-hanging requests
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // Increased timeout to 5 seconds

    try {
      const response = await fetch(
        `http://${devtoolsSettings.serverHost}:${devtoolsSettings.serverPort}/.identity`,
        {
          signal: controller.signal
        }
      )

      clearTimeout(timeoutId)

      if (!response.ok) {
        console.error(
          `Server identity validation failed: HTTP ${response.status} - ${response.statusText}`
        )

        // Notify about the connection failure
        chrome.runtime.sendMessage({
          type: "SERVER_VALIDATION_FAILED",
          reason: "http_error",
          status: response.status,
          statusText: response.statusText,
          serverHost: devtoolsSettings.serverHost,
          serverPort: devtoolsSettings.serverPort
        })

        return false
      }

      const identity = await response.json()
      console.log("Server identity response:", identity)

      // Validate signature
      if (identity.signature !== "mcp-browser-connector-24x7") {
        console.error(
          "Server identity validation failed: Invalid signature",
          identity
        )

        // Notify about the invalid signature
        chrome.runtime.sendMessage({
          type: "SERVER_VALIDATION_FAILED",
          reason: "invalid_signature",
          receivedSignature: identity.signature,
          serverHost: devtoolsSettings.serverHost,
          serverPort: devtoolsSettings.serverPort
        })

        return false
      }

      console.log(
        `Server identity confirmed: ${identity.name} v${identity.version}`
      )

      // Notify about successful validation
      chrome.runtime.sendMessage({
        type: "SERVER_VALIDATION_SUCCESS",
        serverInfo: identity,
        serverHost: devtoolsSettings.serverHost,
        serverPort: devtoolsSettings.serverPort
      })

      return true
    } catch (fetchError) {
      clearTimeout(timeoutId)
      throw fetchError
    }
  } catch (error) {
    console.error("Server identity validation failed:", error)
    console.error(
      `Failed to connect to http://${devtoolsSettings.serverHost}:${devtoolsSettings.serverPort}/.identity`
    )

    // Notify about the connection error
    chrome.runtime.sendMessage({
      type: "SERVER_VALIDATION_FAILED",
      reason: "connection_error",
      error: error.message,
      serverHost: devtoolsSettings.serverHost,
      serverPort: devtoolsSettings.serverPort
    })

    return false
  }
}
