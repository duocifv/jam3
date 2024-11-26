import flatCache from 'flat-cache'
import path from 'path'

const cacheDir = path.resolve('./db')

export function getCache(cacheId) {
  return flatCache.load(cacheId, cacheDir)
}

export function saveCache(cacheId, cache) {
  cache.save(true) // true để xóa cache cũ
}
