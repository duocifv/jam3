import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://cms.duocnv.top/graphql'

// Tạo một client GraphQL
const client = new GraphQLClient(endpoint)

// Hàm fetchData để thực hiện truy vấn GraphQL
export const fetchData = async (query, variables = {}, headers = {}) => {
  try {
    // Kết hợp các header mặc định với header tùy chỉnh
    const allHeaders = {
      'Content-Type': 'application/json',
      ...headers, // Thêm các header từ đối số nếu có
    }

    // Thiết lập header cho client
    client.setHeaders(allHeaders)

    // Thực hiện truy vấn và trả về kết quả
    const result = await client.request(query, variables)
    return result
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Lỗi khi gọi GraphQL:', error)
    throw new Error('Không thể lấy dữ liệu từ server')
  }
}
