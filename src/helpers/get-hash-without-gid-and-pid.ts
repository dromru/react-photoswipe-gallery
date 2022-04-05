import hashToObject from './hash-to-object'
import objectToHash from './object-to-hash'

function getHashWithoutGidAndPid(hash: string): string {
  const obj = hashToObject(hash)
  delete obj.gid
  delete obj.pid
  return objectToHash(obj)
}

export default getHashWithoutGidAndPid
