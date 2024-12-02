import Picture from './Picture'

const Gallery = ({ innerBlocks }) => {
  return (
    <div className="flex border-2 overflow-x-auto">
      {innerBlocks.map((item, index) => {
        const { url, alt, width } = JSON.parse(item.attributesJSON)
        return (
          <div className="w-1/3" key={index}>
            <Picture
              src={url}
              alt={alt}
              width={parseInt(width, 10) || 800}
              height={parseInt(width, 10) || 800}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Gallery
