'use client'
 
import { useRouter } from 'next/navigation'
 
export default  function Modal({ children }) {
  const router = useRouter()
 
  return (
    <>
      <button
        onClick={() => {
          router.back()
        }}
      >
        Close modal
      </button>
      <div>{children}</div>
    </>
  )
}