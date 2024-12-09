import React from 'react'
import ForgotForm from './library/ForgotForm'
import ProductLists from '../demo/library/ProductLists'
import ProductFeatures from '../demo/library/ProductFeatures'

const ForgotPage = async () => {
  return (
    <>
      <ForgotForm />
      <ProductLists />
      <ProductFeatures />
    </>
  )
}

export default ForgotPage
