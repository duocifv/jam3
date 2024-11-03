import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create(
  devtools((set) => ({
    posts:[],
    setPosts: (newPosts) => set({ posts: newPosts }),
    sortBy: (sortBy = "date") =>
      set((state) => {
        // Tạo bản sao của posts để tránh ảnh hưởng đến mảng gốc
        const sortedPosts = [...state.posts].sort((a, b) => {
          if (sortBy === "date") {
            return new Date(b.date) - new Date(a.date); // Sắp xếp từ mới đến cũ
          } else if (sortBy === "title") {
            return a.title.localeCompare(b.title); // Sắp xếp theo thứ tự bảng chữ cái
          }
          return 0;
        });
        return { posts: sortedPosts };
      }),

      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),

      visibleProducts: [],
      page: 1,
      PRODUCTS_PER_PAGE: 10,
      loadMoreProducts: () =>
        set((state) => {
          const newProducts = state.posts.slice(
            state.visibleProducts.length,
            state.visibleProducts.length + state.PRODUCTS_PER_PAGE
          );
    
          return {
            visibleProducts: [...state.visibleProducts, ...newProducts],
            page: state.page + 1,
          };
        }),
  }))
);
