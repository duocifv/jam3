'use client'
import { useProductsStore } from '@/store/useProductsStore'

let values = {}

const Page = () => {
  const customer = useProductsStore((state) => state.customer)
  const addCustomer = useProductsStore((state) => state.addCustomer)
  const checkout = useProductsStore((state) => state.checkout)

  const handleChange = (e, tab) => {
    const { name, value } = e.target
    const filed = {
      [name]: value,
    }
    if (tab) {
      values[tab] = { ...values[tab], ...filed }
    } else {
      values = filed
    }
    addCustomer(values)
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              payment_method:
              <input
                type="text"
                name="payment_method"
                onChange={handleChange}
                defaultValue={customer?.payment_method}
              />
            </td>
          </tr>
          <tr>
            <th>billing</th>
          </tr>
          <tr>
            <td>
              first_name:
              <input
                type="text"
                name="first_name"
                onChange={(e) => handleChange(e, 'billing')}
                defaultValue={customer?.billing?.first_name}
              />
            </td>
          </tr>
          <tr>
            <td>
              address_1:
              <input
                type="text"
                name="address_1"
                onChange={(e) => handleChange(e, 'billing')}
                defaultValue={customer?.billing?.address_1}
              />
            </td>
          </tr>
          <tr>
            <td>
              email:
              <input
                type="text"
                name="email"
                onChange={(e) => handleChange(e, 'billing')}
                defaultValue={customer?.billing?.email}
              />
            </td>
          </tr>
          <tr>
            <td>
              phone:
              <input
                type="text"
                name="phone"
                onChange={(e) => handleChange(e, 'billing')}
                defaultValue={customer?.billing?.phone}
              />
            </td>
          </tr>
          <tr>
            <th>shipping</th>
          </tr>
          <tr>
            <td>
              first_name:
              <input
                type="text"
                name="first_name"
                onChange={(e) => handleChange(e, 'shipping')}
                defaultValue={customer?.shipping?.first_name}
              />
            </td>
          </tr>
          <tr>
            <td>
              address_1:
              <input
                type="text"
                name="address_1"
                onChange={(e) => handleChange(e, 'shipping')}
                defaultValue={customer?.shipping?.address_1}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button className="bg-red-300 p-4" onClick={checkout}>
        Booking
      </button>
    </div>
  )
}

export default Page
