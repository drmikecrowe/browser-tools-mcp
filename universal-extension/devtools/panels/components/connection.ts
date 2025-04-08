// components/connection.ts
import type { BrowserConnectorSettings } from "./settings"
import { getIdentity } from '../../../server/api';

export interface ServerIdentity {
  name: string
  version: string
  signature: string
}

export class ConnectionManager {
  private isConnected = false
  private isDiscoveryInProgress = false
  private reconnectAttemptTimeout: NodeJS.Timeout | null = null
  private discoveryController: AbortController | null = null

  constructor(
    private settings: BrowserConnectorSettings,
    private updateConnectionBanner: (
      connected: boolean,
      identity?: ServerIdentity
    ) => void
  ) {}

  async discoverServer(quietMode: boolean = false): Promise<boolean> {
    // Cancel any ongoing discovery operations before starting a new one
    this.cancelOngoingDiscovery()
    
    this.isDiscoveryInProgress = true
    this.discoveryController = new AbortController()
    
    // Update UI to show searching state
    this.updateConnectionBanner(false, null)
    
    try {
      // Implementation would include server discovery logic
      console.log("Discovering server...")
      
      // Simulate discovery for now
      const success = await this.testConnection(this.settings.serverHost, this.settings.serverPort)
      
      if (success) {
        // Update UI to show connected state
        const identity: ServerIdentity = {
          name: "MCP Browser Connector",
          version: "1.0.0",
          signature: "mcp-browser-connector-24x7"
        }
        this.updateConnectionBanner(true, identity)
        return true
      } else {
        // Update UI to show disconnected state
        this.updateConnectionBanner(false, null)
        this.scheduleReconnectAttempt()
        return false
      }
    } catch (error) {
      console.error("Discovery error:", error)
      // Update UI to show error state
      this.updateConnectionBanner(false, null)
      this.scheduleReconnectAttempt()
      return false
    } finally {
      this.isDiscoveryInProgress = false
      this.discoveryController = null
    }
  }

  async testConnection(host: string, port: number): Promise<boolean> {
    // Cancel any ongoing discovery operations before testing
    this.cancelOngoingDiscovery()
    
    try {
      const identity = await getIdentity(host, port);
      if (identity.signature === "mcp-browser-connector-24x7") {
        this.isConnected = true
        // Update UI to show connected state
        this.updateConnectionBanner(true, identity)
        return true
      }
      this.isConnected = false
      // Update UI to show disconnected state
      this.updateConnectionBanner(false, null)
      return false
    } catch (error) {
      this.isConnected = false
      // Update UI to show error state
      this.updateConnectionBanner(false, null)
      return false
    }
  }

  private scheduleReconnectAttempt(): void {
    if (this.reconnectAttemptTimeout) {
      clearTimeout(this.reconnectAttemptTimeout)
    }
    this.reconnectAttemptTimeout = setTimeout(() => {
      this.discoverServer(true)
    }, 5000)
  }

  // Make this method public so it can be called from panel.tsx
  public cancelOngoingDiscovery(): void {
    if (this.isDiscoveryInProgress) {
      console.log("Cancelling ongoing discovery operation")
      
      // Abort any fetch requests in progress
      if (this.discoveryController) {
        try {
          this.discoveryController.abort()
        } catch (error) {
          console.error("Error aborting discovery controller:", error)
        }
        this.discoveryController = null
      }
      
      // Clear any reconnect timeouts
      if (this.reconnectAttemptTimeout) {
        clearTimeout(this.reconnectAttemptTimeout)
        this.reconnectAttemptTimeout = null
      }
      
      this.isDiscoveryInProgress = false
      
      // Update UI to indicate the operation was cancelled
      this.updateConnectionBanner(false, null)
      
      console.log("Discovery operation cancelled successfully")
    }
  }

  get connected(): boolean {
    return this.isConnected
  }
}
