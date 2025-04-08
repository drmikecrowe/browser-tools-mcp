/**
 * Shared messaging interface for the Browser Tools MCP extension
 * 
 * This provides a consistent interface for messaging between different parts of the extension:
 * - Background scripts
 * - DevTools panel
 * - Content scripts
 * - WebSocket connections
 */
import { sendToBackground } from "@plasmohq/messaging"
import type { PlasmoMessaging } from "@plasmohq/messaging"

// Define message names as keys to make them compatible with Plasmo's messaging system
// These will map to the background message handler filenames
export enum MessageName {
  // Screenshot messages
  CAPTURE_SCREENSHOT = "capture-screenshot",
  TAKE_SCREENSHOT = "take-screenshot",
  
  // Server validation messages
  SERVER_VALIDATION = "server-validation",
  SERVER_VALIDATION_SUCCEEDED = "server-validation-succeeded",
  SERVER_VALIDATION_FAILED = "server-validation-failed",
  
  // WebSocket related messages
  CONNECTION_STATUS_UPDATE = "connection-status-update",
  WEBSOCKET_CONNECTED = "websocket-connected",
  WEBSOCKET_CLOSED = "websocket-closed",
  
  // URL related messages
  UPDATE_URL_ON_SERVER = "update-url-on-server",
  UPDATE_SERVER_URL = "update-server-url",
  
  // Log related messages
  WIPE_LOGS = "wipe-logs",
  
  // Browser Connector related messages
  SEND_TO_CONNECTOR = "send-to-connector",
  SELECTED_ELEMENT = "selected-element",
  
  // Settings related messages
  SETTINGS_UPDATED = "settings-updated",
  
  // Element selection related messages
  ELEMENT_SELECTED = "element-selected"
}

// For backwards compatibility and easier access
export const MessageNames = MessageName

// Define message request/response interfaces
export namespace Messages {
  // Screenshot interfaces
  export interface CaptureScreenshotRequest {
    tabId: number
    screenshotPath?: string
    source?: string
  }

  export interface CaptureScreenshotResponse {
    success: boolean
    data?: string
    title?: string
    path?: string
    error?: string
  }
  
  // Server validation interfaces
  export interface ServerValidationRequest {
    host: string
    port: number
  }
  
  export interface ServerValidationResponse {
    success: boolean
    serverInfo?: {
      name: string
      version: string
    }
    error?: string
  }
  
  // WebSocket interfaces
  export interface ConnectionStatusUpdateRequest {
    connected: boolean
    serverInfo?: {
      name: string
      version: string
    }
    tabId?: number
  }
  
  export interface ConnectionStatusUpdateResponse {
    acknowledged: boolean
  }
  
  // URL update interfaces
  export interface UpdateServerUrlRequest {
    tabId: number
    url: string
    source?: string
  }
  
  export interface UpdateServerUrlResponse {
    success: boolean
    error?: string
  }
  
  // Log interfaces
  export interface WipeLogsRequest {
    serverHost?: string
    serverPort?: number
  }
  
  export interface WipeLogsResponse {
    success: boolean
    message?: string
  }
  
  // Browser Connector interfaces
  export interface SendToConnectorRequest {
    type: string
    data: any
    tabId?: number
  }
  
  export interface SendToConnectorResponse {
    success: boolean
    error?: string
  }
  
  // Element selection interfaces
  export interface ElementSelectedRequest {
    element: any
    tabId: number
  }
  
  export interface ElementSelectedResponse {
    acknowledged: boolean
  }
  
  // Settings interfaces
  export interface SettingsUpdatedRequest {
    settings: any
  }
  
  export interface SettingsUpdatedResponse {
    acknowledged: boolean
  }
}

/**
 * Send a message to the background script
 * This is a type-safe wrapper around Plasmo's sendToBackground function
 */
export async function sendMessage<Request, Response>(
  messageName: MessageName,
  request?: Request
): Promise<Response> {
  try {
    const response = await sendToBackground({
      name: messageName as any, // Type assertion required for Plasmo compatibility
      body: request
    })
    
    return response as Response
  } catch (error) {
    console.error(`Error sending message "${messageName}":`, error)
    throw error
  }
}

/**
 * Capture a screenshot using Plasmo messaging
 */
export async function captureScreenshot(
  tabId: number,
  screenshotPath?: string
): Promise<Messages.CaptureScreenshotResponse> {
  return sendMessage<
    Messages.CaptureScreenshotRequest,
    Messages.CaptureScreenshotResponse
  >(
    MessageName.CAPTURE_SCREENSHOT,
    { tabId, screenshotPath }
  )
}

/**
 * Validate server identity using Plasmo messaging
 */
export async function validateServer(
  host: string,
  port: number
): Promise<Messages.ServerValidationResponse> {
  return sendMessage<
    Messages.ServerValidationRequest,
    Messages.ServerValidationResponse
  >(
    MessageName.SERVER_VALIDATION,
    { host, port }
  )
}

/**
 * Update URL on server using Plasmo messaging
 */
export async function updateServerUrl(
  tabId: number,
  url: string,
  source = "explicit_update"
): Promise<Messages.UpdateServerUrlResponse> {
  return sendMessage<
    Messages.UpdateServerUrlRequest,
    Messages.UpdateServerUrlResponse
  >(
    MessageName.UPDATE_SERVER_URL,
    { tabId, url, source }
  )
}

/**
 * Wipe logs using Plasmo messaging
 */
export async function wipeLogs(
  serverHost?: string,
  serverPort?: number
): Promise<Messages.WipeLogsResponse> {
  return sendMessage<
    Messages.WipeLogsRequest,
    Messages.WipeLogsResponse
  >(
    MessageName.WIPE_LOGS,
    { serverHost, serverPort }
  )
}

/**
 * Send data to the browser connector
 */
export async function sendToBrowserConnector(
  type: string,
  data: any,
  tabId?: number
): Promise<Messages.SendToConnectorResponse> {
  return sendMessage<
    Messages.SendToConnectorRequest,
    Messages.SendToConnectorResponse
  >(
    MessageName.SEND_TO_CONNECTOR,
    { type, data, tabId }
  )
}

/**
 * Update connection status
 */
export async function updateConnectionStatus(
  connected: boolean,
  serverInfo?: { name: string; version: string }
): Promise<Messages.ConnectionStatusUpdateResponse> {
  return sendMessage<
    Messages.ConnectionStatusUpdateRequest,
    Messages.ConnectionStatusUpdateResponse
  >(
    MessageName.CONNECTION_STATUS_UPDATE,
    { connected, serverInfo }
  )
}

/**
 * Create a message handler for a specific message type
 * This is a helper for creating Plasmo message handlers
 */
export function createMessageHandler<Request, Response>(
  handler: (req: Request, res: PlasmoMessaging.Response<Response>) => void | Promise<void>
): PlasmoMessaging.MessageHandler {
  return async (req, res) => {
    try {
      await handler(req.body as Request, res)
    } catch (error) {
      console.error("Error in message handler:", error)
      res.send({
        success: false,
        error: error.message || "Unknown error in message handler"
      } as any)
    }
  }
}
