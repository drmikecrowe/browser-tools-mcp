import { performAttach } from "../performAttach"
import { currentTabId } from "../devtools"

// Helper function to attach debugger
export async function attachDebugger(callback?: (attached: boolean) => void) {
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
