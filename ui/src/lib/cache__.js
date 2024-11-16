import fs from 'fs'
import path from 'path'

class Cache {
  constructor() {
    this.cacheDir = path.join(process.cwd(), 'src', 'cache')
  }

  getCacheFileName(type, subtype) {
    const dirPath = subtype ? path.join(this.cacheDir, type) : this.cacheDir

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    return subtype
      ? path.join(dirPath, `${subtype}.json`)
      : path.join(this.cacheDir, `${type}.json`)
  }

  read(type, subtype) {
    const filePath = this.getCacheFileName(type, subtype)
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(fileData)
    }
    return []
  }

  write(data, type, subtype) {
    if (data === undefined) {
      throw new Error('Data to write is undefined')
    }
    const filePath = this.getCacheFileName(type, subtype)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  }
}

const cache = new Cache()
export default cache
