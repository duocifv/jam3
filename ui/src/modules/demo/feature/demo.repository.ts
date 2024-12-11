import { client } from "@/utils/apiClient";
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

export const getProductsApi = async () => {
  try {
    const res = await fetch("https://cms.duocnv.top/wp-json/custom-data-json/v1/list/auth_forgot")
    if(!res.ok) {
      throw new Error("Error fetching")
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching connection")
  }
}