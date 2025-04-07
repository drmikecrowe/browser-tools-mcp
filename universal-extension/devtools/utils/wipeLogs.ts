import { devtoolsSettings } from "../"

// Function to clear logs on the server
export function wipeLogs() {
  console.log("Wiping all logs...")

  const serverUrl = `http://${devtoolsSettings.serverHost}:${devtoolsSettings.serverPort}/wipelogs`
  console.log(`Sending wipe request to ${serverUrl}`)

  fetch(serverUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      console.log("Logs wiped successfully:", data)
    })
    .catch((error) => {
      console.error("Error wiping logs:", error)
    })
}
