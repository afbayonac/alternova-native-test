import { useEffect, useState } from 'react'
import { ScrollView, useWindowDimensions } from 'react-native'
import Product from '../components/Product'

const Home = () => {
  const [products, setProducts] = useState([])
  const { height } = useWindowDimensions()

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch('http://192.168.20.109:3100/all-products', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json' // I added this line
          }
        })
        if (response.status !== 200) throw new Error('inespected code')

        setProducts(await response.json())
      } catch (e) {
        console.error('request failed: ' + e.message)
      }
    }

    getProduct()
  }, [])

  return (
    <ScrollView style={{ height: height - 60, paddingBottom: 24 }}>
      {products.map(product => <Product key={product.id} item={product} />)}
    </ScrollView>
  )
}

export default Home
