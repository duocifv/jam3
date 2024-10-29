import PostList from "@/components/posts/PostList";
import { fetchQuery } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const query = gql`
  query Posts {
    posts(first: 1000) {
      nodes {
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

export default async function HomePage() {
  const { posts } = (await fetchQuery(query)) || [];
  return <PostList initialData={posts?.nodes} />;
}
