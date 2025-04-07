import { type BrowserConnectorSettings } from "../../store/browserConnectorSettings"

// Validate server identity

export async function validateServerIdentity(
  settings: BrowserConnectorSettings
) {
  const serverUrl = `http://${settings.serverHost}:${settings.serverPort}/.identity`
  
  try {
    console.log(`Validating server identity at ${serverUrl}...`)

    // Use fetch with a timeout to prevent long-hanging requests
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      controller.abort()
      console.error(`Timeout validating server at ${serverUrl}`)
    }, 10000) // Increased timeout to 10 seconds

    try {
      console.log(`Sending fetch request to ${serverUrl}...`)
      
      // Try multiple times with increasing backoff
      let attempts = 0
      const maxAttempts = 3
      let lastError = null
      
      while (attempts < maxAttempts) {
        try {
          attempts++
          console.log(`Attempt ${attempts}/${maxAttempts} to validate server identity`)
          
          const response = await fetch(serverUrl, {
            signal: controller.signal,
            // Add headers to help with CORS
            headers: {
              'Accept': 'application/json',
              'Cache-Control': 'no-cache'
            },
            // Add cache busting to avoid cached responses
            cache: 'no-store',
            // Add a random query parameter to bust cache
            // @ts-ignore
            mode: 'cors',
            credentials: 'omit'
          })

          clearTimeout(timeoutId)
          console.log(`Received response from ${serverUrl}: status ${response.status}`)

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
              serverHost: settings.serverHost,
              serverPort: settings.serverPort
            })

            return false
          }

          const responseText = await response.text()
          console.log(`Raw response: ${responseText}`)
          
          let identity
          try {
            identity = JSON.parse(responseText)
            console.log("Server identity response:", identity)
          } catch (parseError) {
            console.error("Failed to parse server identity response:", parseError)
            console.error("Response was:", responseText)
            
            // Notify about the parse error
            chrome.runtime.sendMessage({
              type: "SERVER_VALIDATION_FAILED",
              reason: "parse_error",
              responseText: responseText,
              serverHost: settings.serverHost,
              serverPort: settings.serverPort
            })
            
            return false
          }

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
              expectedSignature: "mcp-browser-connector-24x7",
              serverHost: settings.serverHost,
              serverPort: settings.serverPort
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
            serverHost: settings.serverHost,
            serverPort: settings.serverPort
          })

          return true
        } catch (attemptError) {
          lastError = attemptError
          console.error(`Attempt ${attempts} failed:`, attemptError)
          
          // If this isn't the last attempt, wait before retrying
          if (attempts < maxAttempts) {
            const waitTime = Math.pow(2, attempts) * 500 // Exponential backoff
            console.log(`Waiting ${waitTime}ms before next attempt...`)
            await new Promise(resolve => setTimeout(resolve, waitTime))
          }
        }
      }
      
      // If we get here, all attempts failed
      throw lastError
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error(`Fetch error for ${serverUrl}:`, fetchError)
      throw fetchError
    }
  } catch (error) {
    console.error(`Server identity validation failed for ${serverUrl}:`, error)

    // Notify about the connection error
    chrome.runtime.sendMessage({
      type: "SERVER_VALIDATION_FAILED",
      reason: "connection_error",
      error: error instanceof Error ? error.message : String(error),
      serverHost: settings.serverHost,
      serverPort: settings.serverPort
    })

    return false
  }
}
