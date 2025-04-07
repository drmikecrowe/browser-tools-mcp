import { currentTabId } from ".."
import { performAttach } from "./performDebuggerAttach"

// Detect if running in Firefox
const isFirefox = navigator.userAgent.includes("Firefox")

// Helper function to attach debugger
export async function attachDebugger(callback?: (attached: boolean) => void) {
  // Skip debugger attachment in Firefox since it's not supported
  if (isFirefox) {
    console.log("Debugger attachment skipped in Firefox (not supported)")
    if (callback) callback(false)
    return
  }

  // First check if we're already attached to this tab
  chrome.debugger.getTargets((targets) => {
    const isAlreadyAttached = targets.some(
      (target) => target.tabId === currentTabId && target.attached
    )

    if (isAlreadyAttached) {
      console.log("Found existing debugger attachment, detaching first...")
      // Force detach first to ensure clean state
      chrome.debugger.detach({ tabId: currentTabId }, () => {
        // Ignore any errors during detach
        if (chrome.runtime.lastError) {
          console.log("Error during forced detach:", chrome.runtime.lastError)
        }
        // Now proceed with fresh attachment
        performAttach(callback)
      })
    } else {
      // No existing attachment, proceed directly
      performAttach(callback)
    }
  })
}
