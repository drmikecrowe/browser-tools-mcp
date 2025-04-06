import "./devtools"

// Initialize the DevTools panel
document.addEventListener("DOMContentLoaded", () => {
  // Create the main container
  const container = document.createElement("div");
  container.className = "browser-tools-devtools-panel";
  
  // Add header
  const header = document.createElement("h1");
  header.textContent = "BrowserTools MCP";
  container.appendChild(header);
  
  // Append to body
  document.body.appendChild(container);
  
  // Load the devtools script
  const script = document.createElement("script");
  script.src = "devtools.js";
  document.body.appendChild(script);
});

// Export an empty object to satisfy TypeScript module requirements
export {};
