import React, { FC } from 'react'
import Image, { ImageProps } from 'next/image'
import clsx from 'clsx'
import './style.css'

interface PictureProps extends ImageProps {
  className: string
}

const Picture: FC<PictureProps> = (p) => {
  return (
    <figure className={clsx('cn-picture', p.className)}>
      <Image {...p} />
    </figure>
  )
}

export default Picture
