import { sendToBackground } from "@plasmohq/messaging"

import type { BrowserConnectorSettings } from "../../store/browserConnectorSettings"
import { validateServerIdentity } from "../utils/validateServerIdentity"

// Define response types for screenshot capture
interface ScreenshotResponse {
  success: boolean
  data?: string
  error?: string
}

/**
 * WebSocketManager class to manage WebSocket connections to the MCP server
 */
export class WebSocketManager {
  // WebSocket connection and timers
  private ws: WebSocket | null = null
  private reconnectTimeout: NodeJS.Timeout | null = null
  private heartbeatInterval: NodeJS.Timeout | null = null

  // Configuration constants
  private readonly RECONNECT_DELAY = 5000 // 5 seconds
  private readonly HEARTBEAT_INTERVAL = 30000 // 30 seconds
  private readonly CONNECTION_TIMEOUT = 10000 // 10 seconds

  // State flags
  private reconnectAfterValidation = false
  private intentionalClosure = false

  // Settings
  private settings: BrowserConnectorSettings

  // Connection state callback
  private onConnectionStateChanged: ((connected: boolean) => void) | null = null

  constructor(settings: BrowserConnectorSettings) {
    this.settings = settings
  }

  /**
   * Set a callback to be notified of connection state changes
   * @param callback Function to call when connection state changes
   */
  public setConnectionStateCallback(
    callback: (connected: boolean) => void
  ): void {
    this.onConnectionStateChanged = callback
  }

  /**
   * Get the current WebSocket instance
   * @returns The current WebSocket instance or null if not connected
   */
  public getWebSocket(): WebSocket | null {
    return this.ws
  }

  /**
   * Check if the WebSocket is currently connected
   * @returns True if connected, false otherwise
   */
  public isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN
  }

  /**
   * Update the settings
   * @param settings New settings
   */
  public updateSettings(settings: BrowserConnectorSettings): void {
    this.settings = settings
  }

  /**
   * Connect to the WebSocket server
   * @returns Promise that resolves when connected or rejects on error
   */
  public async connect(): Promise<void> {
    // Clean up any existing connection first
    this.closeExistingConnection()
    this.clearReconnectTimeout()

    try {
      // First validate the server identity
      const isValid = await validateServerIdentity(this.settings)

      if (!isValid) {
        const errorMsg = `Invalid server identity at ${this.settings.serverHost}:${this.settings.serverPort}`
        console.error(errorMsg)
        throw new Error(errorMsg)
      }

      // If identity validation succeeds, create the WebSocket connection
      return new Promise<void>((resolve, reject) => {
        try {
          this.createWebSocketConnection(resolve, reject)
        } catch (error) {
          console.error("Error creating WebSocket:", error)
          reject(error instanceof Error ? error : new Error(String(error)))
          this.scheduleReconnect()
        }
      })
    } catch (error) {
      console.error("Connection failed:", error)
      // Schedule reconnect on any error
      this.scheduleReconnect()
      // Re-throw the error to be handled by the caller
      throw error
    }
  }

  /**
   * Close the WebSocket connection
   */
  public close(): void {
    this.intentionalClosure = true

    if (this.ws) {
      try {
        this.ws.close()
        console.log("WebSocket closed successfully")
      } catch (e) {
        console.error("Error closing WebSocket:", e)
      }
      this.ws = null
    }

    this.intentionalClosure = false
  }

  /**
   * Perform complete cleanup of all WebSocket resources
   */
  public cleanup(): void {
    this.intentionalClosure = true

    // Close connection
    if (this.ws) {
      try {
        this.ws.close()
      } catch (e) {
        console.error("Error closing WebSocket during cleanup:", e)
      }
      this.ws = null
    }

    // Clear timers
    this.clearReconnectTimeout()
    this.clearHeartbeatInterval()

    console.log("All WebSocket resources cleaned up")
  }

  /**
   * Send a message through the WebSocket
   * @param message Message to send
   * @returns Promise that resolves on success or rejects on error
   */
  public async sendMessage(message: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.isConnected()) {
        reject(new Error("WebSocket not connected"))
        return
      }

      try {
        this.ws!.send(JSON.stringify(message))
        resolve()
      } catch (error) {
        console.error("Error sending message:", error)
        reject(error)
      }
    })
  }

  /**
   * Request current URL for a tab
   * @param tabId ID of the tab
   * @returns Promise that resolves with the URL or rejects on error
   */
  public async getCurrentUrl(tabId: number): Promise<string> {
    try {
      // Use Plasmo messaging to communicate with background script
      const response = await sendToBackground({
        name: "get-current-url",
        body: { tabId }
      })

      if (!response.success) {
        throw new Error(response.error || "Failed to get URL from background")
      }

      return response.url
    } catch (error) {
      console.error("Error getting current URL:", error)
      throw error
    }
  }

  /**
   * Request a screenshot to be captured
   * @param tabId ID of the tab to capture
   * @returns Promise that resolves when the screenshot is captured or rejects on error
   */
  public async captureScreenshot(tabId: number): Promise<ScreenshotResponse> {
    try {
      console.log("Requesting screenshot capture for tab:", tabId)
      
      // Use Plasmo messaging to request screenshot from background
      const response = await sendToBackground({
        name: "capture-screenshot",
        body: { 
          tabId,
          screenshotPath: this.settings.screenshotPath || ""
        }
      });
      
      console.log("Screenshot capture response:", response)
      return response;
    } catch (error) {
      console.error("Error capturing screenshot:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Reconnect after page refresh
   */
  public reconnectAfterPageRefresh(): void {
    this.closeExistingConnection()
    this.clearReconnectTimeout()
    this.connect().catch((error) => {
      console.error("Error reconnecting after page refresh:", error)
    })
  }

  // Private methods

  /**
   * Create a WebSocket connection
   */
  private createWebSocketConnection(
    resolve: () => void,
    reject: (error: Error) => void
  ): void {
    try {
      // Create WebSocket URL with proper protocol
      const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:"
      
      // Add the extension-ws path that the server expects
      const wsUrl = `${wsProtocol}//${this.settings.serverHost}:${this.settings.serverPort}/extension-ws`

      console.log(`Creating WebSocket connection to ${wsUrl}`)
      this.ws = new WebSocket(wsUrl)

      // Set up connection timeout
      const connectionTimeout = setTimeout(() => {
        if (this.ws && this.ws.readyState !== WebSocket.OPEN) {
          console.error(
            `WebSocket connection timed out after ${this.CONNECTION_TIMEOUT}ms`
          )
          this.ws.close()
          reject(new Error("WebSocket connection timeout"))

          // Schedule reconnect
          this.scheduleReconnect()
        }
      }, this.CONNECTION_TIMEOUT)

      // Set up event handlers
      this.setupWebSocketEvents(connectionTimeout, resolve, reject)
    } catch (error) {
      console.error("Error creating WebSocket:", error)
      reject(error instanceof Error ? error : new Error(String(error)))

      // Schedule reconnect
      this.scheduleReconnect()
    }
  }

  /**
   * Set up WebSocket event handlers
   */
  private setupWebSocketEvents(
    connectionTimeout: NodeJS.Timeout,
    resolve: () => void,
    reject: (error: Error) => void
  ): void {
    if (!this.ws) return

    // Handle WebSocket open event
    this.ws.onopen = () => {
      console.log("WebSocket connection established")
      clearTimeout(connectionTimeout)

      // Send initial hello message
      this.sendMessage({
        type: "hello",
        source: "devtools-extension",
        tabId: chrome.devtools.inspectedWindow.tabId,
        timestamp: Date.now()
      }).catch((error) => {
        console.error("Error sending hello message:", error)
      })

      // Start heartbeat interval
      this.startHeartbeatInterval()

      // Notify of connection state change
      if (this.onConnectionStateChanged) {
        this.onConnectionStateChanged(true)
      }

      resolve()
    }

    // Handle WebSocket close event
    this.ws.onclose = (event) => {
      console.log(
        `WebSocket connection closed: ${event.code} - ${event.reason}`
      )
      clearTimeout(connectionTimeout)

      // Clean up resources
      this.clearHeartbeatInterval()
      this.ws = null

      // Notify of connection state change
      if (this.onConnectionStateChanged) {
        this.onConnectionStateChanged(false)
      }

      // Schedule reconnect if not intentionally closed
      if (!this.intentionalClosure) {
        this.scheduleReconnect()
      }
    }

    // Handle WebSocket error event
    this.ws.onerror = (event) => {
      console.error("WebSocket error:", event)
      clearTimeout(connectionTimeout)

      if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
        this.ws.close()
      }

      reject(new Error("WebSocket error"))
    }

    // Handle WebSocket messages
    this.ws.onmessage = (event) => {
      this.handleWebSocketMessage(event)
    }
  }

  /**
   * Handle incoming WebSocket messages
   */
  private handleWebSocketMessage(event: MessageEvent): void {
    try {
      const message = JSON.parse(event.data)
      console.log("Received WebSocket message:", message)

      switch (message.type) {
        case "ping":
          this.handlePingMessage()
          break

        case "get-current-url":
          this.handleGetCurrentUrlMessage(message)
          break

        case "capture-screenshot":
          this.handleCaptureScreenshotMessage(message)
          break

        case "take-screenshot":
          this.handleTakeScreenshotMessage(message)
          break

        case "heartbeat":
          break

        default:
          console.log(`Unhandled message type: ${message.type}`)
          break
      }
    } catch (error) {
      console.error("Error processing WebSocket message:", error)
    }
  }

  /**
   * Handle ping message
   */
  private handlePingMessage(): void {
    this.sendMessage({
      type: "pong",
      timestamp: Date.now()
    }).catch((error) => {
      console.error("Error sending pong response:", error)
    })
  }

  /**
   * Handle get current URL message
   */
  private async handleGetCurrentUrlMessage(message: any): Promise<void> {
    try {
      const url = await this.getCurrentUrl(
        chrome.devtools.inspectedWindow.tabId
      )

      this.sendMessage({
        type: "current-url-response",
        url,
        tabId: chrome.devtools.inspectedWindow.tabId,
        requestId: message.requestId
      }).catch((error) => {
        console.error("Error sending URL response:", error)
      })
    } catch (error) {
      console.error("Error handling get-current-url message:", error)

      this.sendMessage({
        type: "current-url-response",
        url: null,
        tabId: chrome.devtools.inspectedWindow.tabId,
        error: error instanceof Error ? error.message : String(error),
        requestId: message.requestId
      }).catch((err) => {
        console.error("Error sending URL error response:", err)
      })
    }
  }

  /**
   * Handle capture screenshot message
   */
  private async handleCaptureScreenshotMessage(message: any): Promise<void> {
    try {
      const screenshotResult = await this.captureScreenshot(
        chrome.devtools.inspectedWindow.tabId
      )

      if (!screenshotResult.success) {
        throw new Error(
          screenshotResult.error || "Failed to capture screenshot"
        )
      }

      this.sendMessage({
        type: "screenshot-data",
        data: screenshotResult.data,
        tabId: chrome.devtools.inspectedWindow.tabId,
        requestId: message.requestId,
        // Only include path if it's configured in settings
        ...(this.settings.screenshotPath && {
          path: this.settings.screenshotPath
        }),
        // Include auto-paste setting
        autoPaste: this.settings.allowAutoPaste
      }).catch((error) => {
        console.error("Error sending screenshot data:", error)
      })
    } catch (error) {
      console.error("Error handling capture-screenshot message:", error)

      this.sendMessage({
        type: "screenshot-error",
        error: error instanceof Error ? error.message : String(error),
        tabId: chrome.devtools.inspectedWindow.tabId,
        requestId: message.requestId
      }).catch((err) => {
        console.error("Error sending screenshot error response:", err)
      })
    }
  }

  /**
   * Handle take-screenshot message
   * @param message The message
   */
  private handleTakeScreenshotMessage(message: any): void {
    console.log("Handling take-screenshot message:", message)
    
    // Get the current tab ID
    const tabId = chrome.devtools.inspectedWindow.tabId
    
    // Send a message directly to the background script
    chrome.runtime.sendMessage(
      {
        type: "take-screenshot",
        tabId,
        screenshotPath: this.settings.screenshotPath || "",
        requestId: message.requestId || Date.now().toString()
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending screenshot request:", chrome.runtime.lastError)
          
          // Send error to server
          this.sendMessage({
            type: "screenshot-error",
            error: chrome.runtime.lastError.message || "Failed to capture screenshot",
            requestId: message.requestId || Date.now().toString()
          }).catch((sendError) => {
            console.error("Error sending screenshot error:", sendError)
          })
          return
        }
        
        if (response && response.success && response.data) {
          console.log("Screenshot captured successfully, data URL length:", response.data.length)
          
          // Send screenshot data back to server
          this.sendMessage({
            type: "screenshot-data",
            data: response.data,
            path: this.settings.screenshotPath || "",
            requestId: message.requestId || Date.now().toString()
          }).catch((error) => {
            console.error("Error sending screenshot data:", error)
          })
        } else {
          // Send error if screenshot capture failed
          this.sendMessage({
            type: "screenshot-error",
            error: response?.error || "Failed to capture screenshot",
            requestId: message.requestId || Date.now().toString()
          }).catch((error) => {
            console.error("Error sending screenshot error:", error)
          })
        }
      }
    )
  }

  /**
   * Send a heartbeat to keep the connection alive
   */
  private sendHeartbeat(): void {
    if (this.isConnected()) {
      console.log("Sending WebSocket heartbeat")
      this.sendMessage({ type: "heartbeat" }).catch((error) => {
        console.error("Error sending heartbeat:", error)
      })
    }
  }

  /**
   * Start the heartbeat interval
   */
  private startHeartbeatInterval(): void {
    this.clearHeartbeatInterval()
    this.heartbeatInterval = setInterval(
      () => this.sendHeartbeat(),
      this.HEARTBEAT_INTERVAL
    )
    console.log(`Heartbeat interval started (${this.HEARTBEAT_INTERVAL}ms)`)
  }

  /**
   * Schedule a reconnect attempt
   */
  private scheduleReconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
    }

    console.log(`Scheduling reconnect in ${this.RECONNECT_DELAY}ms`)
    this.reconnectTimeout = setTimeout(() => {
      this.connect().catch((error) => {
        console.error("Reconnect failed:", error)
      })
    }, this.RECONNECT_DELAY)
  }

  /**
   * Close existing connection
   */
  private closeExistingConnection(): void {
    if (this.ws) {
      console.log("Closing existing WebSocket connection")
      this.intentionalClosure = true
      try {
        this.ws.close()
      } catch (e) {
        console.error("Error closing WebSocket:", e)
      }
      this.ws = null
      this.intentionalClosure = false
    }
  }

  /**
   * Clear reconnect timeout
   */
  private clearReconnectTimeout(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
      console.log("Reconnect timeout cleared")
    }
  }

  /**
   * Clear heartbeat interval
   */
  private clearHeartbeatInterval(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
      console.log("Heartbeat interval cleared")
    }
  }
}
