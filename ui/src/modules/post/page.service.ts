import { PageDetailsDocument, PagesListDocument } from '@/gql/graphql';
import { cache } from '@/lib/cache';
import { paginate, query } from '@/lib/grapql';

export const getPagesList = async () => {
  const result = cache.read("page");
  if (result?.length) return result;

  try {
    const list = await paginate(PagesListDocument);
    if (!list?.length) {
      console.log("error getPosts", list)
      return []
    }
    cache.write(list, 'pages');

    for (const item of list) {
      const { id, slug, title }: any = item
      const blocks = await query(PageDetailsDocument, {
        pageId: id
      })
      const data = { id, slug, title, blocks }

      if (blocks) {
        cache.write(data, 'pages', `${slug}`)
      } else {
        console.warn(`No data returned for page with ID: ${id}`)
      }
    }

    return list;

  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}


export const getPageDetail = async (slug: string) => {
  if (!slug) {
    console.log("slug không có")
    return {}
  }
  const result = cache.read('pages', `${slug}`)
  if (!result?.length) return result;
  return {};
}


export const getPagePath = async () => {
  try {
    const path: any[] = await getPagesList()
    if (!path.length) {
      console.log("not data getPath")
      return [{ pageSlug: 'home' }]
    }
    return path.map(({ slug }) => ({ pageSlug: slug }))
  } catch (error) {
    console.log("error data getPath")
    return [{ pageSlug: 'home' }]
  }
}


export const getPageCategories = async () => {
  try {
    const result: any = await getPagesList()
    if (!result.length) {
      console.log("not data getCategories")
      return [{ pageSlug: 'home' }]
    }
    return result.map(({ title, slug, pageId }) => ({
      name: title,
      slug,
      pageId,
    }))
  } catch (error) {
    console.log("error data getPath")
    return [{ pageSlug: 'home' }]
  }
}
