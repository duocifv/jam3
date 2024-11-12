import axios from 'axios'

const endpoint = 'https://test.jam.x10.bz/wp-json'
const consumerKey = 'ck_245c50964d2c8b2112fbcc434145d51cd0eef870'
const consumerSecret = 'cs_016e85f2cf5f461c6706da3c732815616936d989'

class ShoppingCtrl {
  addCart(items) {
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
  async checkout() {}
  async order(data) {
    if (!data) return {}
    try {
      console.log('data data', data)
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
  async payment() {}
}

const results = new ShoppingCtrl()
export default results
