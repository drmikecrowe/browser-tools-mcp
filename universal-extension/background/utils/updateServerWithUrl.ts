import { browserConnectorSettings, isConnectedToServer } from ".."
import { validateServerIdentity } from "../../devtools/utils/validateServerIdentity"

/**
 * Update the server with the current URL
 * @param tabId Tab ID
 * @param url URL to send
 * @param source Source of the update
 * @returns Promise that resolves when the update is complete
 */
export async function updateServerWithUrl(
  tabId: number,
  url: string,
  source = "background_update"
): Promise<void> {
  // Skip about: URLs, chrome: URLs, and empty URLs
  if (
    !url ||
    url === "about:blank" ||
    url.startsWith("chrome:") ||
    url === "chrome://newtab/"
  ) {
    console.log(`Background: Skipping URL update for ${url} (filtered URL)`)
    return
  }

  // Skip invalid URLs
  try {
    new URL(url)
  } catch (e) {
    console.error(`Background: Invalid URL: ${url}`)
    return
  }

  console.log(
    `Background: Updating server with URL for tab ${tabId}: ${url} (source: ${source})`
  )

  // If not connected to server, try revalidating
  if (!isConnectedToServer) {
    try {
      // Revalidate server identity
      const isValid = await validateServerIdentity(browserConnectorSettings)
      if (!isValid) {
        console.error(
          "Background: Cannot update server: Not connected to a valid browser tools server"
        )
        return
      }
    } catch (error) {
      console.error("Background: Error validating server identity:", error)
      return
    }
  }

  // Try direct HTTP endpoint first
  const maxRetries = 3
  let retryCount = 0
  let success = false

  // Attempt direct HTTP update with retries
  while (retryCount < maxRetries && !success) {
    try {
      // Send the URL to the server HTTP endpoint
      const serverUrl = `http://${browserConnectorSettings.serverHost}:${browserConnectorSettings.serverPort}/current-url`
      console.log(
        `Background: Attempt ${retryCount + 1}/${maxRetries} to update server with URL: ${url}`
      )

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: url,
          tabId: tabId,
          timestamp: Date.now(),
          source: source
        }),
        // Add a timeout to prevent hanging requests
        signal: AbortSignal.timeout(5000)
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log(
          `Background: Successfully updated server with URL: ${url}`,
          responseData
        )
        success = true
        return // Exit early on success
      } else {
        console.error(
          `Background: Server returned error: ${response.status} ${response.statusText}`
        )
        retryCount++
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    } catch (error) {
      console.error(
        `Background: Error updating server with URL: ${error.message}`
      )
      retryCount++
      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  // If HTTP method failed but WebSocket might be available, try via WebSocket
  if (!success && isConnectedToServer) {
    console.log(
      `Background: HTTP update failed, trying via WebSocket for URL: ${url}`
    )

    // Send message to devtools panel to update via WebSocket
    try {
      // Use sendToContentScript once we fully migrate to Plasmo messaging
      chrome.runtime.sendMessage({
        type: "UPDATE_URL_ON_SERVER",
        tabId: tabId,
        url: url,
        source: source
      })
    } catch (error) {
      console.error("Background: Error sending URL update message:", error)
      throw error
    }
  } else if (!success) {
    console.error(
      `Background: Failed to update server with URL after ${maxRetries} attempts and WebSocket not available`
    )
  }
}
