// Sử dụng require để import thư viện basic-ftp
const { Client } = require('basic-ftp')
const path = require('path')

deploy()

async function deploy() {
  try {
    const client = new Client()
    client.ftp.verbose = true
    // Kết nối đến server cPanel qua FTP
    await client.access({
      host: 'uhf41-22158.azdigihost.com', // Địa chỉ FTP của cPanel
      user: 'wlddztrh', // Tên đăng nhập FTP
      password: 'aL@v05U74i[JNm', // Mật khẩu FTP
      secure: false, // Nếu sử dụng FTPS, thay đổi thành true
    })

    console.log('Đã kết nối đến FTP server')

    // Đăng nhập thành công, bây giờ upload thư mục src/api lên server
    const localDir = path.join(process.cwd(), 'src') // Đường dẫn đến thư mục src/api trong dự án
    const remoteDir = 'api.duocnv.top' // Đường dẫn đến thư mục trên server

    // Upload thư mục src/api lên server
    await client.uploadFromDir(localDir, remoteDir)

    console.log('Đã tải mã nguồn lên server thành công')

    // Đóng kết nối FTP
    client.close()
  } catch (error) {
    console.error('Đã xảy ra lỗi khi triển khai:', error)
  }
}

// Chạy hàm deploy
deploy()
