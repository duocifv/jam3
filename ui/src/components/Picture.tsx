import Image, { ImageProps } from 'next/image'
import React from 'react'

interface PictureProps extends ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
}

const Picture = ({
  src,
  alt,
  width = 1000,
  height = 500,
  ...props
}: PictureProps) => {
  const updatedSrc = src.includes('https://cms.duocnv.top/wp-content/uploads/')
    ? src.replace(
        'https://cms.duocnv.top/wp-content/uploads/',
        'https://photo.duocnv.top/'
      )
    : src
  return (
    <Image
      {...props}
      src={updatedSrc}
      alt={alt || 'images '}
      layout="responsive"
      width={width}
      height={height}
    />
  )
}

export default Picture