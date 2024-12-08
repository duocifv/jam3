import { query } from "@/utils/httpGraphql";
import { gql } from "graphql-request";


export const PageDetailQuery = gql`
  query PageBy {
    pageBy(pageId: 436) {
        content
    }
}
`

export const getDemo = async () => {
  try {
    const data = await query<any>(PageDetailQuery)
    const htmlString = data?.pageBy?.content;
    console.log("htmlString2", htmlString)
    return htmlString
  } catch (error) {
    throw new Error("Lỗi không kết nối server được")
  }
}