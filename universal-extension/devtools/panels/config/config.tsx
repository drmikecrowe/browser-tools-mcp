import React, { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import {
  defaultSettings,
  getSettings,
  onSettingsChanged,
  saveSettings as saveSettingsToStore
} from "../../../store/browserConnectorSettings"
import type { BrowserConnectorSettings } from "../../../store/browserConnectorSettings"

// Main Panel Component
const Panel: React.FC = () => {
  // State for settings
  const [settings, setSettings] =
    useState<BrowserConnectorSettings>(defaultSettings)
  // State for connection status
  const [isConnected, setIsConnected] = useState(false)
  const [serverInfo, setServerInfo] = useState<string | null>(null)
  // State for discovery
  const [isDiscovering, setIsDiscovering] = useState(false)
  const [discoveryMessage, setDiscoveryMessage] = useState("")

  // Load settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const loadedSettings = await getSettings()
        setSettings(loadedSettings)
        console.log("Settings loaded successfully:", loadedSettings)
      } catch (error) {
        console.error("Error loading settings:", error)
      }
    }

    loadSettings()

    // Listen for settings changes
    const unsubscribe = onSettingsChanged((newSettings) => {
      setSettings(newSettings)
    })

    // Listen for connection status updates
    const messageListener = (message, sender, sendResponse) => {
      if (message.type === "CONNECTION_STATUS_UPDATE") {
        console.log(
          `Received connection status update: ${
            message.isConnected ? "Connected" : "Disconnected"
          }`
        )
        setIsConnected(message.isConnected)
        if (message.serverInfo) {
          setServerInfo(message.serverInfo)
        }
      }
    }

    chrome.runtime.onMessage.addListener(messageListener)

    // Clean up listeners
    return () => {
      unsubscribe()
      chrome.runtime.onMessage.removeListener(messageListener)
    }
  }, [])

  // Save settings to storage
  const saveSettings = (newSettings: Partial<BrowserConnectorSettings>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)
    saveSettingsToStore(newSettings)
  }

  // Handle server discovery
  const discoverServer = async (quietMode = false) => {
    if (isDiscovering) return

    setIsDiscovering(true)
    if (!quietMode) {
      setDiscoveryMessage("Discovering server...")
    }

    try {
      // Try common ports
      const commonPorts = [3000, 3001, 3025, 8000, 8080]
      const host = "localhost"

      for (const port of commonPorts) {
        try {
          const response = await fetch(`http://${host}:${port}/api/ping`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          })

          if (response.ok) {
            const data = await response.json()
            if (data && data.status === "ok") {
              // Server found
              saveSettings({
                serverHost: host,
                serverPort: port
              })
              setIsConnected(true)
              setServerInfo(`${host}:${port}`)
              if (!quietMode) {
                setDiscoveryMessage(`Server found at ${host}:${port}`)
              }
              return
            }
          }
        } catch (error) {
          console.log(`No server at ${host}:${port}`)
        }
      }

      if (!quietMode) {
        setDiscoveryMessage("No server found on common ports")
      }
    } finally {
      setIsDiscovering(false)
    }
  }

  // Handle screenshot capture
  const captureScreenshot = () => {
    chrome.runtime.sendMessage({ type: "take-screenshot" }, (response) => {
      if (response && response.success) {
        console.log("Screenshot captured successfully")
      } else {
        console.error(
          "Screenshot capture failed:",
          response?.error || "Unknown error"
        )
      }
    })
  }

  // Test connection to server
  const testConnection = async () => {
    try {
      const { serverHost, serverPort } = settings
      const response = await fetch(
        `http://${serverHost}:${serverPort}/api/ping`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        if (data && data.status === "ok") {
          setIsConnected(true)
          setServerInfo(`${serverHost}:${serverPort}`)
          return true
        }
      }

      setIsConnected(false)
      return false
    } catch (error) {
      console.error("Connection test failed:", error)
      setIsConnected(false)
      return false
    }
  }

  return (
    <div className="panel-container">
      {/* Connection Status Banner */}
      <div
        className={`connection-banner ${isConnected ? "connected" : "disconnected"}`}>
        <div className="connection-status">
          {isConnected ? (
            <>
              <span className="status-indicator connected"></span>
              <span>Connected to {serverInfo}</span>
            </>
          ) : (
            <>
              <span className="status-indicator disconnected"></span>
              <span>Disconnected</span>
            </>
          )}
        </div>
        <div className="connection-actions">
          <button onClick={() => testConnection()}>Test Connection</button>
          <button onClick={() => discoverServer(false)}>Discover Server</button>
        </div>
        {discoveryMessage && (
          <div className="discovery-message">{discoveryMessage}</div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="settings-section">
        <h3>Quick Actions</h3>
        <div className="quick-actions">
          <button className="action-button" onClick={captureScreenshot}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            Capture Screenshot
          </button>
          <button
            className="action-button"
            onClick={() => chrome.runtime.sendMessage({ type: "wipe-logs" })}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            Wipe Logs
          </button>
        </div>
      </div>

      {/* Server Settings */}
      <div className="settings-section">
        <h3>Server Settings</h3>
        <div className="settings-content">
          <div className="form-group">
            <label htmlFor="server-host">Server Host</label>
            <input
              type="text"
              id="server-host"
              value={settings.serverHost}
              onChange={(e) => saveSettings({ serverHost: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="server-port">Server Port</label>
            <input
              type="number"
              id="server-port"
              min="1"
              max="65535"
              value={settings.serverPort}
              onChange={(e) =>
                saveSettings({ serverPort: parseInt(e.target.value, 10) })
              }
            />
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="settings-section">
        <h3>Advanced Settings</h3>
        <div className="settings-content">
          <div className="form-group">
            <label htmlFor="log-limit">Log Limit (number of logs)</label>
            <input
              type="number"
              id="log-limit"
              min="1"
              value={settings.logLimit}
              onChange={(e) =>
                saveSettings({ logLimit: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="query-limit">Query Limit (characters)</label>
            <input
              type="number"
              id="query-limit"
              min="1"
              value={settings.queryLimit}
              onChange={(e) =>
                saveSettings({ queryLimit: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="string-size-limit">
              String Size Limit (characters)
            </label>
            <input
              type="number"
              id="string-size-limit"
              min="1"
              value={settings.stringSizeLimit}
              onChange={(e) =>
                saveSettings({ stringSizeLimit: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="max-log-size">Max Log Size (characters)</label>
            <input
              type="number"
              id="max-log-size"
              min="1000"
              value={settings.maxLogSize}
              onChange={(e) =>
                saveSettings({ maxLogSize: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                id="show-request-headers"
                checked={settings.showRequestHeaders}
                onChange={(e) =>
                  saveSettings({ showRequestHeaders: e.target.checked })
                }
              />
              Include Request Headers
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                id="show-response-headers"
                checked={settings.showResponseHeaders}
                onChange={(e) =>
                  saveSettings({ showResponseHeaders: e.target.checked })
                }
              />
              Include Response Headers
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

// Initialize React
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root")
  if (container) {
    const root = createRoot(container)
    root.render(<Panel />)
  } else {
    console.error("Root element not found")
  }
})
