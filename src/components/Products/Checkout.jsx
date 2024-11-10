import React from 'react'
import { useProductsStore } from '@/stores/useProductsStore'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'

let values = {}

const Checkout = () => {
  const customer = useProductsStore((state) => state.customer)
  const addCustomer = useProductsStore((state) => state.addCustomer)

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
  const checkout = useProductsStore((state) => state.checkout)
  return (
    <div>
      <Input
        label="payment_method:"
        type="text"
        name="payment_method"
        onChange={handleChange}
        defaultValue={customer?.payment_method}
      />
      billing
      <hr />
      <br />
      <Input
        label="first_name:"
        type="text"
        name="first_name"
        onChange={(e) => handleChange(e, 'billing')}
        defaultValue={customer?.billing?.first_name}
      />
      <Input
        label="address_1"
        type="text"
        name="address_1"
        onChange={(e) => handleChange(e, 'billing')}
        defaultValue={customer?.billing?.address_1}
      />
      <Input
        label="email"
        type="text"
        name="email"
        onChange={(e) => handleChange(e, 'billing')}
        defaultValue={customer?.billing?.email}
      />
      <Input
        label="phone"
        type="text"
        name="phone"
        onChange={(e) => handleChange(e, 'billing')}
        defaultValue={customer?.billing?.phone}
      />
      shipping
      <hr />
      <br />
      <Input
        label="first_name"
        type="text"
        name="first_name"
        onChange={(e) => handleChange(e, 'shipping')}
        defaultValue={customer?.shipping?.first_name}
      />
      <Input
        label="address_1"
        type="text"
        name="address_1"
        onChange={(e) => handleChange(e, 'shipping')}
        defaultValue={customer?.shipping?.address_1}
      />
      <hr />
      <Button variant="primary" size="large" onClick={checkout}>
        Primary Button
      </Button>
    </div>
  )
}

export default Checkout
