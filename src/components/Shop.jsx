import { useContext } from 'react'
import { ProductsContext } from '../context/ProductsContext'

const shop = () => {
  const { products } = useContext(ProductsContext)
  console.log('products from shop', products)
  return <div>SHOP</div>
}

export default shop
