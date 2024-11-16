import fs from 'fs'
import path from 'path'

class Cache {
  private cacheDir: string;

  constructor() {
    this.cacheDir = path.join(process.cwd(), 'src', 'cache');
  }

  // Phương thức để lấy tên file cache
  private getCacheFileName(type: string, subtype?: string): string {
    const dirPath = subtype ? path.join(this.cacheDir, type) : this.cacheDir;

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    return subtype
      ? path.join(dirPath, `${subtype}.json`)
      : path.join(this.cacheDir, `${type}.json`);
  }

  // Phương thức đọc dữ liệu từ file cache
  read(type: string, subtype?: string): string[] {
    const filePath = this.getCacheFileName(type, subtype);
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileData) as []
      return data || []
    }
    return [];
  }

  // Phương thức ghi dữ liệu vào file cache
  write(data: string[] | {}, type: string, subtype?: string): void {
    if (data === undefined) {
      throw new Error('Data to write is undefined');
    }
    const filePath = this.getCacheFileName(type, subtype);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
}

// Tạo instance của Cache
export const cache = new Cache();

