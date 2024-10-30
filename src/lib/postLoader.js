import DataLoader from "dataloader";
import { fetchQuery } from "@/lib/apolloClient";
import { GET_POSTS_BY_SLUGS, GET_POSTS } from "@/queries/posts";

let postLoaderInstance;

export const getPostLoader = () => {
  if (!postLoaderInstance) {
    postLoaderInstance = new DataLoader(async (slugs) => {
      const { posts } = await fetchQuery(GET_POSTS_BY_SLUGS, {
        slugs,
      });
      const result = slugs.map((slug) =>
        posts?.nodes?.find((post) => post.slug === slug) || null
      );
      return result;
    });
  }
  return postLoaderInstance;
};

export const createPostLoader = () => {
  const cache = {}; // Lưu trữ dữ liệu đã fetch

  return {
    // Hàm load nhận pageNumber và limit
    load: async (pageNumber, limit) => {
      // Tính toán con trỏ dựa trên pageNumber
      const afterCursor = (pageNumber - 1) * limit;

      // Kiểm tra xem đã fetch dữ liệu cho pageNumber này chưa
      if (cache[pageNumber]) {
        return cache[pageNumber]; // Trả về dữ liệu đã lưu
      }

      // Thực hiện fetch dữ liệu từ GraphQL
      const { posts } = await fetchQuery(GET_POSTS, {
        first: limit, // Số lượng bài viết muốn lấy
        after: afterCursor > 0 ? `cursor_${afterCursor}` : null, // Tạo con trỏ hoặc null cho trang đầu tiên
      });

      // Lưu dữ liệu vào cache
      const postData = {
        posts: posts.edges.map(edge => ({
          ...edge.node,
          cursor: edge.cursor, // Lưu trữ cursor của mỗi bài viết
        })),
        pageInfo: posts.pageInfo,
        totalCount: posts.totalCount,
      };

      cache[pageNumber] = postData; // Lưu vào cache
      return postData; // Trả về dữ liệu
    },
  };
};