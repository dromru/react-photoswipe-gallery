function hashToObject(hash: string): Record<string, string> {
  return hash.split('&').reduce((acc, keyValue) => {
    const [key, ...rest] = keyValue.split('=')
    if (key) {
      const decodedKey = decodeURIComponent(key)
      const value = rest.length > 0 ? rest.join('=') : undefined
      acc[decodedKey] = value !== undefined ? decodeURIComponent(value) : ''
    }
    return acc
  }, {} as Record<string, string>)
}

export default hashToObject
