import { CategoriesPostsDocument, GetPosts2Document, TagsPostsDocument } from '@/gql/graphql';
import { cache } from '@/lib/cache';
import { paginate } from '@/lib/grapql';

export const getPostList = async () => {
  const result = cache.read("posts4");
  if (result?.length) return result;

  try {
    const data = await paginate(GetPosts2Document);
    if (!data?.length) {
      console.log("error getPosts", data)
      return []
    }
    cache.write(data, 'posts4');
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}


export const getPostCategories = async () => {
  const result = cache.read('categories2')
  if (result?.length) return result;

  try {
    const data = await paginate(CategoriesPostsDocument);
    if (!data?.length) {
      console.log(" error getCategories", data)
      return []
    }
    cache.write(data, 'categories2')
  } catch (error) {
    console.error('Error get Categories:', error);
    return [];
  }
}

export const getPostTags = async () => {
  const result = cache.read("tags2")
  if (result?.length) return result
  
  try {
    const data = await paginate(TagsPostsDocument)
    if (!data?.length) {
      console.log(" Tags Posts data", data)
      return []
    }
    cache.write(data, "tags2")
    return result
  } catch (error) {
    console.error('Error get Tags Posts:', error);
    return [];
  }
}
