import { useProductsStore } from '@/stores/useProductsStore'
import Image from 'next/image'

import React from 'react'

interface LineItem {
  id: number
  name: string
  quantity: number
  price: number
  total: number
  image: { src: string }
}

interface OrderDetailsProps {
  id: number
  number: string
  status: string
  currency_symbol: string
  total: string
  billing: {
    first_name: string
    last_name: string
    email: string
    phone: string
  }
  line_items: LineItem[]
  payment_url: string
}

const OrderSummary = () => {
  const step = useProductsStore((state) => state.step)
  const order: OrderDetailsProps = useProductsStore((state) => state.cart)
  return (
    step === 3 && (
      <div className="max-w-4xl mx-auto p-6 bg-white border rounded-md">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>

        {/* Order Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Order #{order.number}</h2>
          <p>
            Status:{' '}
            <span className="font-medium text-gray-500">{order.status}</span>
          </p>
          <p>
            Total:{' '}
            <span className="font-medium text-gray-500">
              {order.currency_symbol}
              {order.total}
            </span>
          </p>
        </div>

        {/* Billing Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Billing Information</h3>
          <p>
            Name: {order.billing.first_name} {order.billing.last_name}
          </p>
          <p>Email: {order.billing.email}</p>
          <p>Phone: {order.billing.phone}</p>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Order Items</h3>
          {order.line_items.map((item) => (
            <div key={item.id} className="flex items-center mb-4">
              <Image
                src={item.image.src}
                alt={item.name}
                className="w-16 h-16 object-cover mr-4"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Price: {order.currency_symbol}
                  {item.price}
                </p>
                <p>
                  Total: {order.currency_symbol}
                  {item.total}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Button */}
        <div className="mt-6">
          <a
            href={order.payment_url}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Pay Now
          </a>
        </div>
      </div>
    )
  )
}
export default OrderSummary
