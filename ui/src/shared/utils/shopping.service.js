import axios from 'axios'

const endpoint = 'https://cms.duocnv.top/wp-json'
const consumerKey = 'ck_5c06725f7bf9c37f4a3848e88bf786d233c70d50'
const consumerSecret = 'cs_4c2000d2af01c308680c3070f0430b69d1350279'

const addCart = async (items) => {
  if (items.length === 0) return []
  try {
    const results = axios.post(`${endpoint}/graphql/cart`, {
      items,
    })
    return results || []
  } catch (error) {
    console.error(error)
    return []
  }
}

const order = async (data) => {
  if (!data) return {}
  try {
    const res = await axios.post(`${endpoint}/wc/v3/orders`, data, {
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
    })
    return res || {}
  } catch (error) {
    console.error('error error', error)
    return {}
  }
}

export { addCart, order }
