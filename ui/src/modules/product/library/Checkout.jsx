import React from 'react'
import { productStore } from '@/stores/product/product.store'
import Input from '@/components/Input'
import Button from '@/components/Button'

let values = {}

const Checkout = () => {
  const customer = productStore((state) => state.customer)
  const addCustomer = productStore((state) => state.addCustomer)

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
  const checkout = productStore((state) => state.checkout)
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
