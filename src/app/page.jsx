import Image from "next/image";

export default async function HomePage() {
  const result = await fetch("https://dummyjson.com/products");
  const { products } = await result.json();
  if (!products) return null;
  return (
    <div className="w-[1100px] mx-auto mb-4 justify-center flex flex-wrap">
      {products.map((item) => (
        <div
          key={item.id}
          className="bg-gray-200 w-[300px] m-4 p-4 hover:opacity-75"
        >
          <a href={item.id}>
            <Image src={item.thumbnail} width={500} height={500} alt="hello" />
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <p>{item.shippingInformation}</p>
          </a>
        </div>
      ))}
    </div>
  );
}
