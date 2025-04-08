import { validateServerIdentity } from "~devtools/utils/validateServerIdentity"
import { sendToBrowserConnector as sendToBrowserConnectorViaPlasmo } from "~messaging/plasmoMessaging"

import { devtoolsSettings } from ".."

// Helper to send logs to browser-connector
export async function sendToBrowserConnector(logData) {
  if (!logData) {
    console.error("No log data provided to sendToBrowserConnector")
    return
  }

  // First, ensure we're connecting to the right server
  if (!(await validateServerIdentity(devtoolsSettings))) {
    console.error(
      "Cannot send logs: Not connected to a valid browser tools server"
    )
    return
  }

  console.log("Sending log data to browser connector:", {
    type: logData.type,
    timestamp: logData.timestamp
  })

  try {
    // Get the current tab ID
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    const currentTabId = tabs[0]?.id

    if (!currentTabId) {
      console.error("No active tab found")
      return
    }

    // Send the data using Plasmo messaging
    const response = await sendToBrowserConnectorViaPlasmo(
      logData.type,
      logData,
      currentTabId
    )

    if (response.success) {
      console.log("Log data sent successfully to browser connector")
    } else {
      console.error("Error sending log data:", response.error)
    }
  } catch (error) {
    console.error("Error sending log data to browser connector:", error)
  }
}
