// components/ui.ts
import type { ServerIdentity } from "./connection"

export class UIManager {
  private connectionBanner: HTMLElement
  private statusText: HTMLElement
  private statusIcon: HTMLElement
  private reconnectButton: HTMLElement

  constructor() {
    this.connectionBanner = document.createElement("div")
    this.statusText = document.createElement("div")
    this.statusIcon = document.createElement("div")
    this.reconnectButton = document.createElement("button")
  }

  createConnectionBanner(): void {
    this.connectionBanner.id = "connection-banner"
    this.connectionBanner.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: #333;
      color: white;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 1000;
    `

    // Status container
    const statusContainer = document.createElement("div")
    statusContainer.style.cssText = `
      display: flex;
      align-items: center;
      width: 100%;
    `

    // Status indicator
    this.statusIcon.id = "banner-status-indicator"
    this.statusIcon.style.cssText = `
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #ccc;
      margin-right: 8px;
      flex-shrink: 0;
    `

    // Status text
    this.statusText.id = "banner-status-text"
    this.statusText.textContent = "Searching for server..."

    // Reconnect button
    this.reconnectButton.id = "banner-reconnect-button"
    this.reconnectButton.textContent = "Reconnect"
    this.reconnectButton.style.cssText = `
      background-color: #333;
      color: white;
      border: none;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 16px;
    `

    // Assemble components
    statusContainer.appendChild(this.statusIcon)
    statusContainer.appendChild(this.statusText)
    this.connectionBanner.appendChild(statusContainer)
    this.connectionBanner.appendChild(this.reconnectButton)
    document.body.prepend(this.connectionBanner)
  }

  updateConnectionBanner(connected: boolean, identity?: ServerIdentity): void {
    if (connected && identity) {
      this.statusIcon.style.backgroundColor = "#4CAF50"
      this.statusText.textContent = `Connected to ${identity.name} v${identity.version}`
      this.reconnectButton.style.display = "none"
    } else {
      this.statusIcon.style.backgroundColor = "#F44336"
      this.statusText.textContent = "Disconnected"
      this.reconnectButton.style.display = "block"
    }
  }
}
