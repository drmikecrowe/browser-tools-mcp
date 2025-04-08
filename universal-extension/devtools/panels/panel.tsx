import type { ServerIdentity } from "./components/connection"
import { ConnectionManager } from "./components/connection"
import { SettingsManager } from "./components/settings"
import { UIManager } from "./components/ui"

// Message interfaces for Plasmo migration
interface CaptureScreenshotRequest {
  tabId: number
  screenshotPath: string
}

interface CaptureScreenshotResponse {
  success: boolean
  title?: string
  path?: string
  error?: string
}

// Initialize managers
const settingsManager = new SettingsManager()
const uiManager = new UIManager()
let connectionManager: ConnectionManager

// Initialize UI elements with proper typing
const logLimitInput = document.getElementById("log-limit") as HTMLInputElement
const queryLimitInput = document.getElementById(
  "query-limit"
) as HTMLInputElement
const stringSizeLimitInput = document.getElementById(
  "string-size-limit"
) as HTMLInputElement
const showRequestHeadersCheckbox = document.getElementById(
  "show-request-headers"
) as HTMLInputElement
const showResponseHeadersCheckbox = document.getElementById(
  "show-response-headers"
) as HTMLInputElement
const maxLogSizeInput = document.getElementById(
  "max-log-size"
) as HTMLInputElement
const screenshotPathInput = document.getElementById(
  "screenshot-path"
) as HTMLInputElement
const captureScreenshotButton = document.getElementById("capture-screenshot")

// Server connection UI elements
const serverHostInput = document.getElementById(
  "server-host"
) as HTMLInputElement
const serverPortInput = document.getElementById(
  "server-port"
) as HTMLInputElement
const discoverServerButton = document.getElementById("discover-server")
const testConnectionButton = document.getElementById("test-connection")

// Initialize collapsible advanced settings
const advancedSettingsHeader = document.getElementById(
  "advanced-settings-header"
)
const advancedSettingsContent = document.getElementById(
  "advanced-settings-content"
)
const chevronIcon = advancedSettingsHeader.querySelector(".chevron")

// Get all inputs by ID
const allowAutoPasteCheckbox = document.getElementById(
  "allow-auto-paste"
) as HTMLInputElement

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Panel DOMContentLoaded.")

  // Fetch initial settings from the store
  try {
    await settingsManager.loadSettings()
    console.log(
      "Panel: Initial settings loaded:",
      settingsManager.currentSettings
    )
    updateUIFromSettings() // Update UI with loaded settings

    // Initialize connection manager
    connectionManager = new ConnectionManager(
      settingsManager.currentSettings,
      updateConnectionBanner
    )

    // Create connection status banner at the top
    uiManager.createConnectionBanner()

    // Automatically discover server on panel load with quiet mode enabled
    connectionManager.discoverServer(true)
  } catch (error) {
    console.error("Panel: Failed to load initial settings:", error)
    // UI will use default settings if loading fails
    updateUIFromSettings()
  }

  // --- Event Listeners for Inputs ---

  logLimitInput.addEventListener("change", (e) => {
    const value = parseInt((e.target as HTMLInputElement).value, 10)
    if (!isNaN(value)) {
      settingsManager.updateSettings({ logLimit: value })
      saveCurrentSettings()
    }
  })

  queryLimitInput.addEventListener("change", (e) => {
    const value = parseInt((e.target as HTMLInputElement).value, 10)
    if (!isNaN(value)) {
      settingsManager.updateSettings({ queryLimit: value })
      saveCurrentSettings()
    }
  })

  stringSizeLimitInput.addEventListener("change", (e) => {
    const value = parseInt((e.target as HTMLInputElement).value, 10)
    if (!isNaN(value)) {
      settingsManager.updateSettings({ stringSizeLimit: value })
      saveCurrentSettings()
    }
  })

  showRequestHeadersCheckbox.addEventListener("change", (e) => {
    settingsManager.updateSettings({
      showRequestHeaders: (e.target as HTMLInputElement).checked
    })
    saveCurrentSettings()
  })

  showResponseHeadersCheckbox.addEventListener("change", (e) => {
    settingsManager.updateSettings({
      showResponseHeaders: (e.target as HTMLInputElement).checked
    })
    saveCurrentSettings()
  })

  maxLogSizeInput.addEventListener("change", (e) => {
    const value = parseInt((e.target as HTMLInputElement).value, 10)
    if (!isNaN(value)) {
      settingsManager.updateSettings({ maxLogSize: value })
      saveCurrentSettings()
    }
  })

  screenshotPathInput.addEventListener("change", (e) => {
    settingsManager.updateSettings({
      screenshotPath: (e.target as HTMLInputElement).value
    })
    saveCurrentSettings()
  })

  serverHostInput.addEventListener("change", (e) => {
    settingsManager.updateSettings({
      serverHost: (e.target as HTMLInputElement).value
    })
    saveCurrentSettings()
  })

  serverPortInput.addEventListener("change", (e) => {
    const value = parseInt((e.target as HTMLInputElement).value, 10)
    if (!isNaN(value) && value >= 1 && value <= 65535) {
      settingsManager.updateSettings({ serverPort: value })
      saveCurrentSettings()
    }
  })

  allowAutoPasteCheckbox.addEventListener("change", (e) => {
    settingsManager.updateSettings({
      allowAutoPaste: (e.target as HTMLInputElement).checked
    })
    saveCurrentSettings()
  })

  // Button event listeners
  if (discoverServerButton) {
    discoverServerButton.addEventListener("click", () => {
      connectionManager.discoverServer(false)
    })
  }

  if (testConnectionButton) {
    testConnectionButton.addEventListener("click", async () => {
      const host = serverHostInput.value
      const port = parseInt(serverPortInput.value, 10)
      if (host && !isNaN(port)) {
        await connectionManager.testConnection(host, port)
      }
    })
  }

  if (captureScreenshotButton) {
    captureScreenshotButton.addEventListener("click", async () => {
      // Handle screenshot capture
      const button = captureScreenshotButton as HTMLButtonElement
      button.textContent = "Capturing..."

      // Send message to background script to capture screenshot
      const request: CaptureScreenshotRequest = {
        tabId: chrome.devtools.inspectedWindow.tabId,
        screenshotPath: settingsManager.currentSettings.screenshotPath
      }
      chrome.runtime.sendMessage(request, (response: CaptureScreenshotResponse) => {
        console.log("Screenshot capture response:", response)
        if (!response) {
          button.textContent = "Failed to capture!"
          console.error("Screenshot capture failed: No response received")
        } else if (!response.success) {
          button.textContent = "Failed to capture!"
          console.error("Screenshot capture failed:", response.error)
        } else {
          button.textContent = `Captured: ${response.title}`
          console.log("Screenshot captured successfully:", response.path)
        }
        setTimeout(() => {
          button.textContent = "Capture Screenshot"
        }, 2000)
      })
    })
  }

  // Advanced settings toggle
  if (advancedSettingsHeader) {
    advancedSettingsHeader.addEventListener("click", () => {
      advancedSettingsContent.classList.toggle("visible")
      chevronIcon.classList.toggle("open")
    })
  }

  console.log("Panel script initialized.")
})

// Function to update the UI based on the current 'settings' object
function updateUIFromSettings() {
  const settings = settingsManager.currentSettings
  logLimitInput.value = settings.logLimit.toString()
  queryLimitInput.value = settings.queryLimit.toString()
  stringSizeLimitInput.value = settings.stringSizeLimit.toString()
  showRequestHeadersCheckbox.checked = settings.showRequestHeaders
  showResponseHeadersCheckbox.checked = settings.showResponseHeaders
  maxLogSizeInput.value = settings.maxLogSize.toString()
  screenshotPathInput.value = settings.screenshotPath
  serverHostInput.value = settings.serverHost
  serverPortInput.value = settings.serverPort.toString()
  allowAutoPasteCheckbox.checked = settings.allowAutoPaste
}

// Function to save the current 'settings' object back to the store
async function saveCurrentSettings() {
  try {
    await settingsManager.saveSettings()
    console.log("Panel: Settings saved successfully.")
  } catch (error) {
    console.error("Panel: Failed to save settings:", error)
  }
}

// Function to update the connection banner
function updateConnectionBanner(connected: boolean, identity?: ServerIdentity) {
  uiManager.updateConnectionBanner(connected, identity)
}
