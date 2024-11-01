export async function generateStaticParams() {
  const categories = ["quan", "ao", "giay"];
  const items = ["1", "2", "3"];
  const paths = [];
  for (const categoryId of categories) {
    for (const itemId of items) {
      paths.push({ categoryId, itemId });
    }
  }
  return paths;
}

const Page = async ({ params }) => {
  const { categoryId, itemId} = await params;
  return (
    <div>
      Loại: {categoryId} : tên: {itemId}
    </div>
  );
};

export default Page;
