/**
 * Messaging ports definition for Browser Tools MCP
 * 
 * This file defines all the port names used with Plasmo's port messaging system
 * For type-safety, all port names should be declared here and imported elsewhere
 */

// Port names as string literals to support TypeScript
// IMPORTANT: These must match the filenames in background/ports/* and contents/* directories
export const PortName = {
  CONNECTION_STATUS: "connection-status",
  // Add new port names here to match Plasmo's file naming requirements
  // For example:
  // EXAMPLE_PORT: "example-port"
} as const

// Derive TypeScript type for port names
export type PortNameType = typeof PortName[keyof typeof PortName]

// Special port handler types for TypeScript
// This matches Plasmo's port message format
export interface PortMessageType<T = any> {
  body?: T
  timestamp?: number
}

// Connection status message format
export interface ConnectionStatusMessage {
  connected: boolean
  serverInfo?: {
    name: string
    version: string
  }
  tabId?: number
}
