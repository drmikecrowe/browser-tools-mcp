// Helper to calculate the size of an object

export function calculateObjectSize(obj) {
  return JSON.stringify(obj).length
}
