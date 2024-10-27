import { fetchQuery } from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const get_products = gql`
  query Products {
    products {
      nodes {
        slug
      }
    }
  }
`;

const get_product = gql`
  query Product($ID: ID!) {
     product(id: $ID, idType: SLUG) { 
      id
      name
      slug
      status
      title
      content
      dateGmt
      description
      ... on SimpleProduct {
        price
        image {
          sourceUrl
        }
      }
      ... on VariableProduct {
        price
        image {
          sourceUrl
        }
      }
      ... on ExternalProduct {
        price
        image {
          sourceUrl
        }
      }
      ... on GroupProduct {
        price
        image {
          sourceUrl
        }
      }
    }
  }
`;

export async function generateStaticParams() {
  const { products } = await fetchQuery(get_products);
  const nodes = products?.nodes ?? [];
  return nodes.map((item) => ({
    slug: item.slug.toString(),
    page: 1,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { product = {} } = await fetchQuery(get_product, { ID: slug });
  if (!product || !product.slug) {
    notFound();
  }
  return {
    title: product.name || "no title",
    description: product.description || "no description",
  };
}

const DetailPage = async ({ params }) => {
  const { slug } = await params;
  const { product } = await fetchQuery(get_product, { ID: slug });
  if (!product) {
    notFound();
  }
  return (
    <div className="w-[1200px] flex mx-auto bg-gray-200 m-6">
      <div>
        {product?.image?.sourceUrl && (
          <Image
            src={product.image.sourceUrl}
            width={570}
            height={727}
            alt="hello"
          />
        )}
      </div>
      <div className="w-[600px] p-6">
        <h1 className="font-bold text-3xl mb-4 py-4">{product?.title}</h1>
        <div>Price:
        <div dangerouslySetInnerHTML={{ __html: product?.price }} /></div>
        Content:
        <div dangerouslySetInnerHTML={{ __html: product?.content }} />
        <Link href="/">Back</Link>
      </div>
    </div>
  );
};

export default DetailPage;
