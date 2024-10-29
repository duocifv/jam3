import PostList from "@/components/posts/PostList";
import { fetchQuery } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Posts {
    posts(first: 1000) {
      nodes {
        id
        slug
        status
        title
        content
        date
        excerpt
      }
    }
  }
`;

export default async function PostsPage() {
  const { posts } = (await fetchQuery(GET_POSTS)) || [];
  return <PostList initialData={posts?.nodes} />;
}
