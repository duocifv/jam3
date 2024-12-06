import React, { FC, ReactNode } from 'react'
import './style.css'
import clsx from 'clsx'

const Text: FC<{
  className?: string
  copy?: string | ReactNode
  children?: string | ReactNode
}> = (p) => {
  return (
    p?.copy && (
      <div className={clsx('text', p.className)} {...p}>
        {p.copy} {p.children}
      </div>
    )
  )
}

export default Text
