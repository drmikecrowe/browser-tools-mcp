import { validateServerIdentity } from "~devtools/utils/validateServerIdentity"

import { devtoolsSettings } from "../devtools"
import { processJsonString } from "./processJsonString"

// Helper to send logs to browser-connector
export async function sendToBrowserConnector(logData) {
  if (!logData) {
    console.error("No log data provided to sendToBrowserConnector")
    return
  }

  // First, ensure we're connecting to the right server
  if (!(await validateServerIdentity())) {
    console.error(
      "Cannot send logs: Not connected to a valid browser tools server"
    )
    return
  }

  console.log("Sending log data to browser connector:", {
    type: logData.type,
    timestamp: logData.timestamp
  })

  // Process any string fields that might contain JSON
  const processedData = { ...logData }

  if (logData.type === "network-request") {
    console.log("Processing network request")
    if (processedData.requestBody) {
      console.log("Request body size before:", processedData.requestBody.length)
      processedData.requestBody = processJsonString(
        processedData.requestBody,
        devtoolsSettings.stringSizeLimit
      )
      console.log("Request body size after:", processedData.requestBody.length)
    }
    if (processedData.responseBody) {
      console.log(
        "Response body size before:",
        processedData.responseBody.length
      )
      processedData.responseBody = processJsonString(
        processedData.responseBody,
        devtoolsSettings.stringSizeLimit
      )
      console.log(
        "Response body size after:",
        processedData.responseBody.length
      )
    }
  } else if (
    logData.type === "console-log" ||
    logData.type === "console-error"
  ) {
    console.log("Processing console message")
    if (processedData.message) {
      console.log("Message size before:", processedData.message.length)
      processedData.message = processJsonString(
        processedData.message,
        devtoolsSettings.stringSizeLimit
      )
      console.log("Message size after:", processedData.message.length)
    }
  }

  // Add settings to the request
  const payload = {
    data: {
      ...processedData,
      timestamp: Date.now()
    },
    settings: {
      logLimit: devtoolsSettings.logLimit,
      queryLimit: devtoolsSettings.queryLimit,
      showRequestHeaders: devtoolsSettings.showRequestHeaders,
      showResponseHeaders: devtoolsSettings.showResponseHeaders
    }
  }

  const finalPayloadSize = JSON.stringify(payload).length
  console.log("Final payload size:", finalPayloadSize)

  if (finalPayloadSize > 1000000) {
    console.warn("Warning: Large payload detected:", finalPayloadSize)
    console.warn(
      "Payload preview:",
      JSON.stringify(payload).substring(0, 1000) + "..."
    )
  }

  const serverUrl = `http://${devtoolsSettings.serverHost}:${devtoolsSettings.serverPort}/extension-log`
  console.log(`Sending log to ${serverUrl}`)

  fetch(serverUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      console.log("Log sent successfully:", data)
    })
    .catch((error) => {
      console.error("Error sending log:", error)
    })
}
