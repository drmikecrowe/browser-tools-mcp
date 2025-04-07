import { currentTabId } from "../devtools"
import { sendToBrowserConnector } from "./sendToBrowserConnector"

// Move the console message listener outside the panel creation

export const consoleMessageListener = (source, method, params) => {
  // Only process events for our tab
  if (source.tabId !== currentTabId) {
    return
  }

  if (method === "Runtime.exceptionThrown") {
    const entry = {
      type: "console-error",
      message:
        params.exceptionDetails.exception?.description ||
        JSON.stringify(params.exceptionDetails),
      level: "error",
      timestamp: Date.now()
    }
    sendToBrowserConnector(entry)
  }

  if (method === "Runtime.consoleAPICalled") {
    // Process all arguments from the console call
    let formattedMessage = ""
    const args = params.args || []

    // Extract all arguments and combine them
    if (args.length > 0) {
      // Try to build a meaningful representation of all arguments
      try {
        formattedMessage = args
          .map((arg) => {
            // Handle different types of arguments
            if (arg.type === "string") {
              return arg.value
            } else if (arg.type === "object" && arg.preview) {
              // For objects, include their preview or description
              return JSON.stringify(arg.preview)
            } else if (arg.description) {
              // Some objects have descriptions
              return arg.description
            } else {
              // Fallback for other types
              return arg.value || arg.description || JSON.stringify(arg)
            }
          })
          .join(" ")
      } catch (e) {
        // Fallback if processing fails
        console.error("Failed to process console arguments:", e)
        formattedMessage =
          args[0]?.value || "Unable to process console arguments"
      }
    }

    const entry = {
      type: params.type === "error" ? "console-error" : "console-log",
      level: params.type,
      message: formattedMessage,
      timestamp: Date.now()
    }
    sendToBrowserConnector(entry)
  }
}
