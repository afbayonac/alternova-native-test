import { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Product from '../components/Product'
import { fetchProducts } from '../store/products'

const Home = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.product.list)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <ScrollView style={{ flex: 1 }}>
      {products.map(product => <Product key={product.id} item={product} />)}
    </ScrollView>
  )
}

export default Home
