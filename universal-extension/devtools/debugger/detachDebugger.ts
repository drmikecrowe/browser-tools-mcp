import { currentTabId } from ".."
import { consoleMessageListener } from "../utils/consoleMessageListener"

// Detect if running in Firefox
const isFirefox = process.env.PLASMO_BROWSER.startsWith("firefox")

// Track debugger state locally
let _isDebuggerAttached = false

// Get current debugger state
export function isDebuggerAttached(): boolean {
  return _isDebuggerAttached
}

// Set debugger state and notify listeners if provided
export function setDebuggerAttached(
  attached: boolean,
  callback?: (attached: boolean) => void
): void {
  _isDebuggerAttached = attached
  if (callback) {
    callback(attached)
  }
}

// Helper function to detach debugger
export function detachDebugger(callback?: (attached: boolean) => void) {
  // Skip debugger detachment in Firefox since it's not supported
  if (isFirefox) {
    console.log("Debugger detachment skipped in Firefox (not supported)")
    setDebuggerAttached(false, callback)
    return
  }

  // Remove the event listener first
  chrome.debugger.onEvent.removeListener(consoleMessageListener)

  // Check if debugger is actually attached before trying to detach
  chrome.debugger.getTargets((targets) => {
    const isStillAttached = targets.some(
      (target) => target.tabId === currentTabId && target.attached
    )

    if (!isStillAttached) {
      console.log("Debugger already detached")
      setDebuggerAttached(false, callback)
      return
    }

    chrome.debugger.detach({ tabId: currentTabId }, () => {
      if (chrome.runtime.lastError) {
        console.warn(
          "Warning during debugger detach:",
          chrome.runtime.lastError
        )
      }
      setDebuggerAttached(false, callback)
      console.log("Debugger detached")
    })
  })
}
