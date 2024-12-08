import { getDemo } from "./demo.repository"
import { JSDOM } from 'jsdom';

export const demoService = async () => {
  const htmlString = await getDemo()
  if (!htmlString) return

  const dom = new JSDOM(htmlString);
  const document = dom.window.document;
  const result = {
    title: document.querySelector('h2.wp-block-heading').innerHTML.trim(),
    callouts: []
  };

  document.querySelectorAll('.wp-block-columns').forEach((columnsElement) => {
    const columns = [];

    columnsElement.querySelectorAll('.wp-block-column').forEach((columnElement) => {
      const columnData: any = {};

      const pTitle = columnElement.querySelector('.wp-block-heading');
      if (pTitle) {
        columnData.name = pTitle.innerHTML.trim();
        columnData.nameStyle = {
          tag: pTitle.tagName,
          style: pTitle.getAttribute('style'),
          class: pTitle.getAttribute('class').replace('wp-block-heading', '')
        };
      }

      const pElement = columnElement.querySelector('p');
      if (pElement) {
        columnData.description = pElement.innerHTML.trim();
        columnData.descriptionStyle = {
          tag: pTitle.tagName,
          style: pTitle.getAttribute('style'),
          class: pTitle.getAttribute('class').replace('wp-block-heading', '')
        }

        const imgElement = columnElement.querySelector('.wp-block-image img');
        if (imgElement) {
          columnData.imageSrc = imgElement.src;
          columnData.imageAlt = columnData.name;
        }

        columnData.href = '#';

        columns.push(columnData);
      }
    })

    result.callouts.push(...columns);

  });

  return result
}