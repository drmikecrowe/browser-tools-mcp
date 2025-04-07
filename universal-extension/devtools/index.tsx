import "./devtools"

import HTML from "url:./panels/panel.html"

chrome.devtools.panels.create(
  "BrowserTools MCP",
  null,
  // See: https://github.com/PlasmoHQ/plasmo/issues/106#issuecomment-1188539625
  HTML.split("/").pop()
)

function IndexDevtools() {
  return (
    <h2>
      Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
    </h2>
  )
}

export default IndexDevtools
