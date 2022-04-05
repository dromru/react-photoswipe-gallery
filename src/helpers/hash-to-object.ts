function hashToObject(hash: string): Record<string, string> {
  return hash.split('&').reduce((acc, keyValue) => {
    const [key, value] = keyValue.split('=')
    if (key) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, string>)
}

export default hashToObject
