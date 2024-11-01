import Link from "next/link";
import TypeBox from "@/ui/Type";

const data = [
  {
    categoryId: "quan",
  },
  {
    categoryId: "ao",
  },
  {
    categoryId: "giay",
  },
];

export async function generateStaticParams() {
  return data;
}

const Page = async ({ params }) => {
  const { categoryId } = await params;
  console.log("params", categoryId);
  return (
    <div>
      Category:{" "}
      {data.map((item, index) => (
        <>
          <div key={index}>{item.categoryId}</div>
          {Array.from({ length: 3 }, (_, index) => (
            <Link href={`${item.categoryId}/${index + 1}`} key={item.categoryId + index}>
              - {index + 1} -
            </Link>
          ))}
        </>
      ))}
      <TypeBox />
    </div>
  );
};

export default Page;
