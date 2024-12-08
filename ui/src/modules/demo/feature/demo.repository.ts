import { query } from "@/utils/httpGraphql";
import { gql } from "graphql-request";
import { JSDOM } from 'jsdom';


export const PageDetailQuery = gql`
  query PageBy {
    pageBy(pageId: 127) {
        content
    }
}
`
export const getDemo = async () => {
  const data = await query<any>(PageDetailQuery)
  const htmlString = data?.pageBy?.content;
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;
  const result = {
    title: document.querySelector('h2').textContent,
    cards: []
  };

  document.querySelectorAll('.wp-block-columns').forEach((columnsElement) => {
    const columns = [];

    columnsElement.querySelectorAll('.wp-block-column').forEach((columnElement) => {
      const columnData: any = {};

      const imgElement = columnElement.querySelector('img');
      if (imgElement) {
        columnData.image = imgElement.src;
      }

      const pElement = columnElement.querySelector('p');
      if (pElement) {
        columnData.text = pElement.textContent.trim();
      }

      columns.push(columnData);
    });

    result.cards.push(columns);
  });

  return result
}