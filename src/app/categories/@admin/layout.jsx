
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <>
      <nav>
        <Link href="/categories/page-views">Page Views</Link>/
        <Link href="/categories/visitors">Visitors</Link>
      </nav>
      <div>{children}</div>
    </>
  )
}
