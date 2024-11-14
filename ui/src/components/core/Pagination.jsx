// components/Pagination.js
import Link from 'next/link'

const Pagination = ({ pageInfo, toltal }) => {
  const prevPage = pageInfo.nextPage
    ? `/posts/page/${pageInfo.perPage - 1}`
    : null
  const nextPage = pageInfo.previousPage
    ? `/posts/page/${pageInfo.perPage + 1}`
    : null

  return (
    <div>
      {prevPage && (
        <Link href={prevPage}>
          <button>Previous</button>
        </Link>
      )}
      <span>
        {' '}
        ---- Page {pageInfo.perPage}/{toltal} ----
      </span>
      {nextPage && (
        <Link href={nextPage}>
          <button>Next</button>
        </Link>
      )}
    </div>
  )
}

export default Pagination
