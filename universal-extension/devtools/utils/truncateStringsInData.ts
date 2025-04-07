// Utility to recursively truncate strings in any data structure

export function truncateStringsInData(data, maxLength, depth = 0, path = "") {
  // Add depth limit to prevent circular references
  if (depth > 100) {
    console.warn("Max depth exceeded at path:", path)
    return "[MAX_DEPTH_EXCEEDED]"
  }

  console.log(`Processing at path: ${path}, type:`, typeof data)

  if (typeof data === "string") {
    if (data.length > maxLength) {
      console.log(
        `Truncating string at path ${path} from ${data.length} to ${maxLength}`
      )
      return data.substring(0, maxLength) + "... (truncated)"
    }
    return data
  }

  if (Array.isArray(data)) {
    console.log(`Processing array at path ${path} with length:`, data.length)
    return data.map((item, index) =>
      truncateStringsInData(item, maxLength, depth + 1, `${path}[${index}]`)
    )
  }

  if (typeof data === "object" && data !== null) {
    console.log(
      `Processing object at path ${path} with keys:`,
      Object.keys(data)
    )
    const result = {}
    for (const [key, value] of Object.entries(data)) {
      try {
        result[key] = truncateStringsInData(
          value,
          maxLength,
          depth + 1,
          path ? `${path}.${key}` : key
        )
      } catch (e) {
        console.error(`Error processing key ${key} at path ${path}:`, e)
        result[key] = "[ERROR_PROCESSING]"
      }
    }
    return result
  }

  return data
}
