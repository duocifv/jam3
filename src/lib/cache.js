import {
  GET_POSTS_BY_SLUGS,
  GET_CATEGORIES_POSTS,
  GET_POPULAR_TAGS
} from "@/queries/posts";
import APIService from "@/lib/APIService";

const cache = new APIService();

async function fetchDataWithPagination(query, type) {
  let hasNextPage = true;
  let cursor = null;
  let data = [];

  while (hasNextPage) {
    try {
      const response = await cache.fetch(query, {
        after: cursor,
        first: 100,
      });
      const edges = response[type]?.edges;

      if (!edges) break;

      data.push(...edges);
      hasNextPage = response[type].pageInfo.hasNextPage;
      cursor = response[type].pageInfo.endCursor;
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      break;
    }
  }

  return data.reduce((acc, item) => {
    acc[item.node.slug] = item.node;
    return acc;
  }, {});
}



const db = {
  Posts: async (slug) => {
    const cachedData = cache.read("posts");

    if (Object.keys(cachedData).length) {
      return slug ? cachedData[slug] : Object.values(cachedData);
    }

    const postsData = await fetchDataWithPagination(
      GET_POSTS_BY_SLUGS,
      "posts"
    );
    cache.write("posts", postsData);
    return slug ? postsData[slug] : postsData;
  },

  PostsCategories: async (slug) => {
    const cachedData = cache.read("categories");

    if (Object.keys(cachedData).length) {
      return slug ? cachedData[slug] : Object.values(cachedData);
    }

    const categoriesData = await fetchDataWithPagination(
      GET_CATEGORIES_POSTS,
      "categories"
    );
    cache.write("categories", categoriesData);
    return slug ? categoriesData[slug] : categoriesData;
  },

  PostsTags: async () => {
    const cachedData = cache.read("tags");
    
    if (cachedData && cachedData.length) {
      return cachedData;
    }
    
    const { tags } = await cache.fetch(GET_POPULAR_TAGS);
    cache.write("tags", tags?.nodes);

    return tags?.nodes;
  },

};

export default db;
