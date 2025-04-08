// components/settings.ts
import type { BrowserConnectorSettings } from "~/store/browserConnectorSettings"
import {
  defaultSettings,
  getSettings,
  saveSettings as storeSettings,
  onSettingsChanged
} from "~/store/browserConnectorSettings"

export type { BrowserConnectorSettings }
export { defaultSettings }

export class SettingsManager {
  private settings: BrowserConnectorSettings
  private changeListeners: Array<() => void> = []

  constructor() {
    this.settings = { ...defaultSettings }
  }

  async loadSettings(): Promise<void> {
    try {
      this.settings = await getSettings()
      console.log("SettingsManager: Settings loaded:", this.settings)
    } catch (error) {
      console.error("SettingsManager: Failed to load settings:", error)
    }
  }

  async saveSettings(): Promise<void> {
    try {
      await storeSettings(this.settings)
      console.log("SettingsManager: Settings saved successfully.")
    } catch (error) {
      console.error("SettingsManager: Failed to save settings:", error)
    }
  }

  get currentSettings(): BrowserConnectorSettings {
    return this.settings
  }

  updateSettings(updates: Partial<BrowserConnectorSettings>): void {
    this.settings = { ...this.settings, ...updates }
  }

  addChangeListener(callback: () => void): void {
    this.changeListeners.push(callback)
    // Set up the global listener if this is the first callback
    if (this.changeListeners.length === 1) {
      onSettingsChanged((newSettings) => {
        this.settings = newSettings
        // Notify all listeners
        this.changeListeners.forEach(listener => listener())
      })
    }
  }

  removeChangeListener(callback: () => void): void {
    this.changeListeners = this.changeListeners.filter(
      listener => listener !== callback
    )
  }
}
