import React, { FC } from 'react'
import Image, { ImageProps } from 'next/image'
import clsx from 'clsx'
import './style.css'

const Picture: FC<ImageProps> = (p) => {
  return (
    <figure className={clsx('cn-picture', p.className)}>
      <Image {...p} />
    </figure>
  )
}

export default Picture
