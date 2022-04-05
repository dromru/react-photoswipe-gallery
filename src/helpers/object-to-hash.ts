function objectToHash(obj: Record<string, string | number>): string {
  return Object.entries(obj)
    .map(([key, value]) => (value ? `${key}=${value}` : key))
    .join('&')
}

export default objectToHash
