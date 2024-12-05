import React, { FC, ReactNode } from 'react'
import clsx from 'clsx'
import './style.css'

const Text: FC<{
  children: string | ReactNode
}> = (p) => {
  return <div className="text">{p.children}</div>
}

export default Text
