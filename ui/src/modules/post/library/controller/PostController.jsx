import { useStore } from '@/stores/useStore'
import { useEffect } from 'react'

const PostController = ({ children, initialData }) => {
  const setPosts = useStore((state) => state.setPosts)

  useEffect(() => {
    setPosts(initialData)
  }, [setPosts, initialData])

  return children
}

export default PostController
