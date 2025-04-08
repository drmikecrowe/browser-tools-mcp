/**
 * Connection status port handler for background script
 * 
 * This handles the long-lived port connection with the devtools panel
 * for sending connection status updates
 */

import { Storage } from "@plasmohq/storage"

// Store active connection ports by tabId for efficient updates
const connectionPorts: Map<number, chrome.runtime.Port> = new Map()

/**
 * Handle a new port connection for connection status updates
 */
export function setupConnectionStatusPort(port: chrome.runtime.Port) {
  const sender = port.sender
  const tabId = sender?.tab?.id

  if (!tabId) {
    console.warn("Connection status port from unknown source:", sender)
    return
  }

  console.log(`Connection status port connected for tab ${tabId}`)
  
  // Store the port for future updates
  connectionPorts.set(tabId, port)
  
  // Clean up when the port disconnects
  port.onDisconnect.addListener(() => {
    console.log(`Connection status port disconnected for tab ${tabId}`)
    connectionPorts.delete(tabId)
  })
  
  // Handle any messages from the devtools panel
  port.onMessage.addListener(async (message) => {
    console.log(`Message from connection port for tab ${tabId}:`, message)
    // Handle any messages if needed
  })
}

/**
 * Send a connection status update to a specific devtools panel
 */
export function sendConnectionStatus(
  tabId: number, 
  connected: boolean, 
  serverInfo?: { name: string; version: string }
) {
  const port = connectionPorts.get(tabId)
  
  if (port) {
    try {
      port.postMessage({ 
        connected, 
        serverInfo,
        timestamp: Date.now() 
      })
    } catch (error) {
      console.error(`Error sending connection status to tab ${tabId}:`, error)
      // Clean up potentially dead port
      connectionPorts.delete(tabId)
    }
  }
}

/**
 * Send a connection status update to all connected devtools panels
 */
export function broadcastConnectionStatus(
  connected: boolean, 
  serverInfo?: { name: string; version: string }
) {
  connectionPorts.forEach((port, tabId) => {
    try {
      port.postMessage({ 
        connected, 
        serverInfo,
        timestamp: Date.now() 
      })
    } catch (error) {
      console.error(`Error broadcasting connection status to tab ${tabId}:`, error)
      // Clean up potentially dead port
      connectionPorts.delete(tabId)
    }
  })
}
