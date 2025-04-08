import { wipeLogs as wipeLogsViaPlasmo } from "~messaging/plasmoMessaging"

import { devtoolsSettings } from ".."

// Function to clear logs on the server
export async function wipeLogs() {
  console.log("Wiping all logs...")

  try {
    const response = await wipeLogsViaPlasmo(
      devtoolsSettings.serverHost,
      devtoolsSettings.serverPort
    )

    if (response.success) {
      console.log("Logs wiped successfully:", response.message)
    } else {
      console.error("Error wiping logs:", response.message)
    }
  } catch (error) {
    console.error("Error wiping logs:", error)
  }
}
