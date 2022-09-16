import hashToObject from './hash-to-object'

const hashIncludesNavigationQueryParams = (hash: string): boolean => {
  const hashParts = hashToObject(hash)
  return Boolean(hashParts.gid) && Boolean(hashParts.pid)
}

export default hashIncludesNavigationQueryParams
