function getHashValue(): string {
  return window.location.hash.substring(1)
}

export default getHashValue
