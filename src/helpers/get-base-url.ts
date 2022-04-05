function getBaseUrl(): string {
  return `${window.location.pathname}${window.location.search}`
}

export default getBaseUrl
