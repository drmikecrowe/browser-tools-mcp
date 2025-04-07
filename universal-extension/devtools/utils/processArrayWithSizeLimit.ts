import { calculateObjectSize } from "~devtools/utils/calculateObjectSize"

// Helper to process array of objects with size limit

export function processArrayWithSizeLimit(array, maxTotalSize, processFunc) {
  let currentSize = 0
  const result = []

  for (const item of array) {
    // Process the item first
    const processedItem = processFunc(item)
    const itemSize = calculateObjectSize(processedItem)

    // Check if adding this item would exceed the limit
    if (currentSize + itemSize > maxTotalSize) {
      console.log(
        `Reached size limit (${currentSize}/${maxTotalSize}), truncating array`
      )
      break
    }

    // Add item and update size
    result.push(processedItem)
    currentSize += itemSize
    console.log(
      `Added item of size ${itemSize}, total size now: ${currentSize}`
    )
  }

  return result
}
