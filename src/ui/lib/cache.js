import fs from 'fs'
import path from 'path'

class Cache {
  constructor() {
    this.cacheDir = path.join(process.cwd(), 'src', 'ui', 'cache')
  }

  getCacheFileName(type) {
    return path.join(this.cacheDir, `${type}.json`)
  }

  read(type) {
    const filePath = this.getCacheFileName(type)
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(fileData)
    }
    return []
  }

  write(type, data) {
    const filePath = this.getCacheFileName(type)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  }
}

const result = new Cache()

export default result
