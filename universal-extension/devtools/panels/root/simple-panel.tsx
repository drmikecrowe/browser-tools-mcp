import React from "react"
import { createRoot } from "react-dom/client"

// Simple Panel Component
const BrowserToolsPanel = () => {
  return (
    <div>
      <h2>Browser Tools MCP</h2>
      <p>Panel loaded successfully!</p>
      <button
        onClick={() => {
          chrome.runtime.sendMessage(
            { type: "take-screenshot" },
            (response) => {
              console.log("Screenshot response:", response)
            }
          )
        }}>
        Capture Screenshot
      </button>
    </div>
  )
}

// Initialize React when the DOM is ready
const root = createRoot(document.getElementById("root"))
console.log("Simple panel loaded")
root.render(<BrowserToolsPanel />)
console.log("Simple panel rendered")
