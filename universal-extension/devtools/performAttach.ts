import { currentTabId } from "./devtools"
import { consoleMessageListener } from "./utils/consoleMessageListener"
import { setDebuggerAttached } from "./utils/detachDebugger"

export function performAttach(callback?: (attached: boolean) => void) {
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
