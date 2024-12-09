import { getDemo, getProductsApi } from './demo.repository'
import { JSDOM } from 'jsdom'

export const productsService = async (): Promise<{products, feature}> => {
  const result = await getProductsApi()
  if (!result) return null
  const { data } = JSON.parse(result?.data)
  if(!data) return null
  return {
    products: [
      data?.products1,
      data?.products2,
      data?.products3,
    ],
    feature: {
      title: data?.technical,
      copy: data?.technicalCopy,
      features: [
        data?.features,
        data?.features2,
        data?.features3,
        data?.features4,
        data?.features5,
        data?.features6,
      ],
    },
  }
}

export const demoService = async () => {
  const htmlString = await getDemo()
  if (!htmlString) return

  const dom = new JSDOM(htmlString)
  const document = dom.window.document
  const result = {
    title: document.querySelector('h2.wp-block-heading').innerHTML.trim(),
    callouts: [],
  }

  document.querySelectorAll('.wp-block-columns').forEach((columnsElement) => {
    const columns = []

    columnsElement
      .querySelectorAll('.wp-block-column')
      .forEach((columnElement) => {
        const columnData: any = {}

        const pTitle = columnElement.querySelector('.wp-block-heading')
        if (pTitle) {
          columnData.name = pTitle.innerHTML.trim()
          columnData.nameStyle = {
            tag: pTitle.tagName,
            style: pTitle.getAttribute('style'),
            class: pTitle.getAttribute('class').replace('wp-block-heading', ''),
          }
        }

        const pElement = columnElement.querySelector('p')
        if (pElement) {
          columnData.description = pElement.innerHTML.trim()
          columnData.descriptionStyle = {
            tag: pTitle.tagName,
            style: pTitle.getAttribute('style'),
            class: pTitle.getAttribute('class').replace('wp-block-heading', ''),
          }

          const imgElement = columnElement.querySelector('.wp-block-image img')
          if (imgElement) {
            columnData.imageSrc = imgElement.src
            columnData.imageAlt = columnData.name
          }

          columnData.href = '#'

          columns.push(columnData)
        }
      })

    result.callouts.push(...columns)
  })

  return result
}
