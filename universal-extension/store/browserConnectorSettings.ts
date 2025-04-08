import { Storage } from "@plasmohq/storage"
import { MessageName } from "~messaging/plasmoMessaging"

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
  // Get current settings first
  const currentSettings = await getSettings()
  
  // Merge with new settings
  const newSettings = { ...currentSettings, ...settings }
  
  // Save to storage
  await storage.set(SETTINGS_KEY, newSettings)
  console.log("Background: Saved settings:", newSettings)
  
  // Broadcast settings update using Plasmo's messaging
  try {
    // This is handled by the browser extension's event system
    // and the settings-updated.ts handler in the background script
    chrome.runtime.sendMessage({
      name: MessageName.SETTINGS_UPDATED,
      body: {
        settings: newSettings
      }
    }).catch(error => {
      console.error("Error broadcasting settings update:", error)
    })
  } catch (error) {
    console.error("Error broadcasting settings update:", error)
  }
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

  // Listen for runtime messages about settings updates from Plasmo
  const messageListener = (message) => {
    if (message.name === MessageName.SETTINGS_UPDATED && message.body?.settings) {
      callback(message.body.settings)
    }
  }

  chrome.runtime.onMessage.addListener(messageListener)

  // Return a function to remove the listeners
  return () => {
    chrome.storage.onChanged.removeListener(listener)
    chrome.runtime.onMessage.removeListener(messageListener)
  }
}
