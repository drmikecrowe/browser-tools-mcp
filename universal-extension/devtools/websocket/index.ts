import type { BrowserConnectorSettings } from "../../store/browserConnectorSettings"
import { WebSocketManager } from "./WebSocketManager"

// Create a singleton WebSocketManager instance
let manager: WebSocketManager | null = null

// Exported variables for backward compatibility
export let ws: WebSocket | null = null
export let wsReconnectTimeout: NodeJS.Timeout | null = null
export let heartbeatInterval: NodeJS.Timeout | null = null
export let intentionalClosure = false
export let reconnectAfterValidation = false

// Constants
export const WS_RECONNECT_DELAY = 5000
export const HEARTBEAT_INTERVAL = 30000
export const WS_CONNECTION_TIMEOUT = 10000

/**
 * Initialize the WebSocketManager with settings
 * @param settings Browser connector settings
 */
export async function setupWebSocket(
  settings: BrowserConnectorSettings
): Promise<void> {
  console.log("Setting up WebSocket connection with settings:", settings)

  if (!manager) {
    // First time initialization
    manager = new WebSocketManager(settings)

    // Set connection state callback to update exported variables
    manager.setConnectionStateCallback((connected) => {
      // Update the exported ws variable to maintain backward compatibility
      ws = manager?.getWebSocket() || null
    })
  } else {
    // Update settings if manager already exists
    manager.updateSettings(settings)
  }

  try {
    // Connect to WebSocket
    await manager.connect()

    // Update the exported ws variable to maintain backward compatibility
    ws = manager.getWebSocket()
    console.log("WebSocket connection established successfully")
  } catch (error) {
    console.error("Error connecting to WebSocket:", error)
    ws = null
  }
}

/**
 * Clean up WebSocket resources
 */
export function cleanupWebSocketResources(): void {
  console.log("Cleaning up WebSocket resources")
  if (manager) {
    manager.cleanup()
    ws = null
    intentionalClosure = true
  }
}

/**
 * Close the WebSocket connection
 */
export function closeWebSocket(): void {
  console.log("Closing WebSocket connection")
  if (manager) {
    manager.close()
    ws = null
    intentionalClosure = true
  }
}

/**
 * Clear WebSocket reconnect timeout
 */
export function clearReconnectTimeout(): void {
  // This is now handled internally by the WebSocketManager
  console.log("clearReconnectTimeout called - handled by WebSocketManager")
}

/**
 * Clear WebSocket heartbeat interval
 */
export function clearHeartbeatInterval(): void {
  // This is now handled internally by the WebSocketManager
  console.log("clearHeartbeatInterval called - handled by WebSocketManager")
}

/**
 * Close existing WebSocket connection
 */
export function closeExistingWebSocket(): void {
  console.log("Closing existing WebSocket connection")
  if (manager) {
    intentionalClosure = true
    manager.close()
    ws = null
    intentionalClosure = false
  }
}

/**
 * Handle reconnection after page refresh
 * @param settings Browser connector settings
 */
export function handleReconnectAfterPageRefresh(
  settings: BrowserConnectorSettings
): void {
  console.log("Handling reconnect after page refresh")
  if (manager) {
    manager.updateSettings(settings)
    manager.reconnectAfterPageRefresh()
    ws = manager.getWebSocket()
  } else {
    // Create manager if it doesn't exist
    setupWebSocket(settings)
  }
}

/**
 * Send a message through the WebSocket
 * @param message Message to send
 * @returns Promise that resolves when the message is sent
 */
export async function sendMessage(message: any): Promise<void> {
  if (!manager || !manager.isConnected()) {
    throw new Error("WebSocket not connected")
  }

  return manager.sendMessage(message)
}

/**
 * Get the current URL
 * @param tabId Tab ID
 * @returns Promise that resolves with the URL
 */
export async function getCurrentUrl(tabId: number): Promise<string> {
  if (!manager) {
    throw new Error("WebSocket manager not initialized")
  }

  return manager.getCurrentUrl(tabId)
}

/**
 * Capture a screenshot
 * @param tabId Tab ID
 * @returns Promise that resolves with the screenshot data
 */
export async function captureScreenshot(
  tabId: number
): Promise<{ success: boolean; data?: string; error?: string }> {
  if (!manager) {
    throw new Error("WebSocket manager not initialized")
  }

  return manager.captureScreenshot(tabId)
}
