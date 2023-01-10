import { ScrollView, useWindowDimensions, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { fetchBuy } from '../store/products'

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.product.list.filter(p => p.cart > 0))
  const { height } = useWindowDimensions()
  const total = cart.reduce((aco, product) => aco + product.cart * product.unit_price, 0)

  const handleBuy = () => {
    dispatch(fetchBuy())
  }

  return (
    <ScrollView style={{ height: height - 60, paddingBottom: 24 }}>
      {
        cart
          .map(product => (
            <View key={product.id} style={styles.item}>
              <Text>{product.name}</Text>
              <Text>${product.unit_price}</Text>
              <Text>X</Text>
              <Text>{product.cart}</Text>
              <Text>${product.cart * product.unit_price}</Text>
            </View>
          ))
      }
      <Text>Total: {total}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleBuy}
      >
        <Text style={styles.buttonText}>Buy</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  cart: {
    alignContent: 'center',
    flex: 1
  },
  button: {
    height: 40,
    padding: 8,
    backgroundColor: '#ccc',
    marginHorizontal: 16,
    borderRadius: 5,
    flex: 1
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'orange',
    textAlign: 'center',
    fontFamily: 'DynaPuff'

  }
})

export default Cart
