import { Storage } from "@plasmohq/storage"

// Define the settings interface
export interface BrowserConnectorSettings {
  logLimit: number
  queryLimit: number
  stringSizeLimit: number
  maxLogSize: number
  showRequestHeaders: boolean
  showResponseHeaders: boolean
  screenshotPath: string
  serverHost: string
  serverPort: number
  allowAutoPaste: boolean
  autoUpdateUrls: boolean
}

// Default settings
export const defaultSettings: BrowserConnectorSettings = {
  logLimit: 50,
  queryLimit: 30000,
  stringSizeLimit: 500,
  maxLogSize: 20000,
  showRequestHeaders: false,
  showResponseHeaders: false,
  screenshotPath: "",
  serverHost: "localhost",
  serverPort: 3025,
  allowAutoPaste: false,
  autoUpdateUrls: true
}

// Create a storage instance
const storage = new Storage({
  area: "local"
})

// Key for storing settings
const SETTINGS_KEY = "browserConnectorSettings"

/**
 * Get the current settings
 * @returns Promise with the current settings
 */
export async function getSettings(): Promise<BrowserConnectorSettings> {
  const settings = await storage.get<BrowserConnectorSettings>(SETTINGS_KEY)
  const final = settings
    ? { ...defaultSettings, ...settings }
    : { ...defaultSettings }
  console.log("Background: Got settings:", final)
  return final
}

/**
 * Save settings
 * @param settings The settings to save
 * @returns Promise that resolves when settings are saved
 */
export async function saveSettings(
  settings: Partial<BrowserConnectorSettings>
): Promise<void> {
  const currentSettings = await getSettings()
  const newSettings = { ...currentSettings, ...settings }
  await storage.set(SETTINGS_KEY, newSettings)

  // Notify all parts of the extension about the settings update
  chrome.runtime.sendMessage({
    type: "SETTINGS_UPDATED",
    settings: newSettings
  })
}

/**
 * Listen for settings changes
 * @param callback Function to call when settings change
 * @returns Function to remove the listeners
 */
export function onSettingsChanged(
  callback: (settings: BrowserConnectorSettings) => void
): () => void {
  const listener = (changes, area) => {
    if (area === "local" && SETTINGS_KEY in changes) {
      const newSettings = changes[SETTINGS_KEY].newValue
      callback(newSettings)
    }
  }

  chrome.storage.onChanged.addListener(listener)

  // Also listen for runtime messages about settings updates
  const messageListener = (message) => {
    if (message.type === "SETTINGS_UPDATED") {
      callback(message.settings)
    }
  }

  chrome.runtime.onMessage.addListener(messageListener)

  // Return a function to remove the listeners
  return () => {
    chrome.storage.onChanged.removeListener(listener)
    chrome.runtime.onMessage.removeListener(messageListener)
  }
}
