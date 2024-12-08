import { getDemo } from "./demo.repository"


export const demoService = async () => {
  const result = await getDemo()
  console.log("result", result.cards)
  return []

}