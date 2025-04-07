import { currentTabId } from ".."
import { consoleMessageListener } from "../utils/consoleMessageListener"
import { setDebuggerAttached } from "./detachDebugger"

// Detect if running in Firefox
const isFirefox = navigator.userAgent.includes("Firefox")

export function performAttach(callback?: (attached: boolean) => void) {
  // Skip debugger attachment in Firefox since it's not supported
  if (isFirefox) {
    console.log("Debugger attachment skipped in Firefox (not supported)")
    setDebuggerAttached(false, callback)
    return
  }

  console.log("Performing debugger attachment to tab:", currentTabId)
  chrome.debugger.attach({ tabId: currentTabId }, "1.3", () => {
    if (chrome.runtime.lastError) {
      console.error("Failed to attach debugger:", chrome.runtime.lastError)
      setDebuggerAttached(false, callback)
      return
    }

    setDebuggerAttached(true, callback)
    console.log("Debugger successfully attached")

    // Add the event listener when attaching
    chrome.debugger.onEvent.addListener(consoleMessageListener)

    chrome.debugger.sendCommand(
      { tabId: currentTabId },
      "Runtime.enable",
      {},
      () => {
        if (chrome.runtime.lastError) {
          console.error("Failed to enable runtime:", chrome.runtime.lastError)
          return
        }
        console.log("Runtime API successfully enabled")
      }
    )
  })
}
