export type InputObject = Record<string, string | number | undefined>

function objectToHash(obj: InputObject): string {
  return Object.entries(obj)
    .map(([key, value]) => (value ? `${key}=${value}` : key))
    .join('&')
}

export default objectToHash
