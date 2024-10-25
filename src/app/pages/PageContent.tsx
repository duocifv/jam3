"use client"
import { gql, useQuery } from "@apollo/client";

const GET_PAGES = gql`
  query Pages {
    pages {
      edges {
        cursor
        node {
          date
          id
          link
          pageId
          status
          slug
          title
          uri
        }
      }
    }
  }
`;

export const PageContent = () => {
    const { loading, error, data } = useQuery(GET_PAGES);
    console.log("data", data)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    return (
        <div>
            <h1>Pages</h1>
          
        </div>
    );
};
