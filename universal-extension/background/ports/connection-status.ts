/**
 * Connection status port handler for the background script
 * 
 * This is a simple port handler that receives connection status messages
 * and forwards them to other connected ports.
 */
import { PortName } from "~messaging/ports"

// Store connected ports for broadcasting
const connectedPorts = new Map<number, chrome.runtime.Port>()

/**
 * Set up the connection status port handler
 */
export function setupConnectionStatusPort() {
  console.log("Background: Setting up connection status port handler")
  
  // Listen for port connections
  chrome.runtime.onConnect.addListener((port) => {
    if (port.name === PortName.CONNECTION_STATUS) {
      const tabId = port.sender?.tab?.id
      
      if (!tabId) {
        console.warn("Background: Connection status port from unknown source")
        return
      }
      
      console.log(`Background: Connection status port connected for tab ${tabId}`)
      connectedPorts.set(tabId, port)
      
      // Set up message listener
      port.onMessage.addListener((message) => {
        console.log(`Background: Connection status message from tab ${tabId}:`, message)
        
        // Handle connection status update message
        if (message.body?.connected !== undefined) {
          const { connected, serverInfo } = message.body
          
          // Broadcast to all other connected ports
          broadcastConnectionStatus(connected, serverInfo, tabId)
        }
      })
      
      // Clean up when port disconnects
      port.onDisconnect.addListener(() => {
        console.log(`Background: Connection status port disconnected for tab ${tabId}`)
        connectedPorts.delete(tabId)
      })
    }
  })
}

/**
 * Send connection status to a specific tab
 */
export function sendConnectionStatus(
  tabId: number,
  connected: boolean,
  serverInfo?: { name: string; version: string }
) {
  const port = connectedPorts.get(tabId)
  
  if (port) {
    console.log(`Background: Sending connection status to tab ${tabId}:`, { connected })
    
    port.postMessage({
      body: {
        connected,
        serverInfo,
        timestamp: Date.now()
      }
    })
  }
}

/**
 * Broadcast connection status to all connected ports
 * Optionally exclude the originating tab to avoid echo
 */
export function broadcastConnectionStatus(
  connected: boolean,
  serverInfo?: { name: string; version: string },
  excludeTabId?: number
) {
  console.log(`Background: Broadcasting connection status to all tabs:`, {
    connected,
    excluding: excludeTabId
  })
  
  connectedPorts.forEach((port, tabId) => {
    // Skip the originating tab if specified
    if (excludeTabId && tabId === excludeTabId) {
      return
    }
    
    port.postMessage({
      body: {
        connected,
        serverInfo,
        timestamp: Date.now()
      }
    })
  })
}

// Added default export for compatibility with module expectations
export default {};
