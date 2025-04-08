import { processArrayWithSizeLimit } from "~devtools/utils/processArrayWithSizeLimit"
import { truncateStringsInData } from "~devtools/utils/truncateStringsInData"

import { devtoolsSettings } from ".."

// Modified processJsonString to handle arrays with size limit
export function processJsonString(jsonString, maxLength) {
  console.log("Processing string of length:", jsonString?.length)
  try {
    let parsed
    try {
      parsed = JSON.parse(jsonString)
      console.log(
        "Successfully parsed as JSON, structure:",
        JSON.stringify(Object.keys(parsed))
      )
    } catch (e) {
      console.log("Not valid JSON, treating as string")
      return truncateStringsInData(jsonString, maxLength, 0, "root")
    }

    // If it's an array, process with size limit
    if (Array.isArray(parsed)) {
      console.log("Processing array of objects with size limit")
      const processed = processArrayWithSizeLimit(
        parsed,
        devtoolsSettings.maxLogSize,
        (item) => truncateStringsInData(item, maxLength, 0, "root")
      )
      const result = JSON.stringify(processed)
      console.log(
        `Processed array: ${parsed.length} -> ${processed.length} items`
      )
      return result
    }

    // Otherwise process as before
    const processed = truncateStringsInData(parsed, maxLength, 0, "root")
    const result = JSON.stringify(processed)
    console.log("Processed JSON string length:", result.length)
    return result
  } catch (e) {
    console.error("Error in processJsonString:", e)
    return jsonString.substring(0, maxLength) + "... (truncated)"
  }
}
