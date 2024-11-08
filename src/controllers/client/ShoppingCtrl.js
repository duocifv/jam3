import axios from 'axios'

const endpoint = `http://localhost:3000/wc`

class ShoppingCtrl {
  addCart(items) {
    console.log('itemCart items', items)
    if (items.length === 0) return []
    try {
      const results = axios.post(`${endpoint}/cart`, {
        items,
      })
      return results || []
    } catch (error) {
      console.error(error)
      return []
    }
  }
  async checkout() {}
  async order() {}
  async payment() {}
}

const results = new ShoppingCtrl()
export default results
