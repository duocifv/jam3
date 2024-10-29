import Link from "next/link";

export default async function HomePage() {
  return (
    <div>
      <h2>Hello Posts</h2>
      <Link href="/post/page/2"> Post </Link>
    </div>
  );
}
