import hashToObject from './hash-to-object.js'
import objectToHash from './object-to-hash.js'

function getHashWithoutGidAndPid(hash: string): string {
  const obj = hashToObject(hash)
  delete obj.gid
  delete obj.pid
  return objectToHash(obj)
}

export default getHashWithoutGidAndPid
