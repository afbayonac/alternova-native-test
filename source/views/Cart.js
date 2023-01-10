import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { fetchBuy } from '../store/products'

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.product.list.filter(p => p.cart > 0))
  const total = cart.reduce((aco, product) => aco + product.cart * product.unit_price, 0)

  const handleBuy = () => {
    dispatch(fetchBuy())
  }

  return (
    <View style={styles.cart}>
      <View style={styles.card}>
        {
          cart
            .map(product => (
              <View key={product.id} style={styles.item}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.unitPrice}>${product.unit_price}</Text>
                <Text style={styles.x}>X</Text>
                <Text style={styles.quantity}>{product.cart}</Text>
                <Text style={styles.subTotal}>${product.cart * product.unit_price}</Text>
              </View>
            ))
        }
        <Text style={styles.total}>Total: {total}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleBuy}
        >
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cart: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1
  },
  card: {
    marginHorizontal: 16,
    paddingTop: 16,
    overflow: 'hidden',
    borderRadius: 4,
    height: 'auto'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 32,
    paddingHorizontal: 16
  },
  name: {
    flexDirection: 'row',
    fontSize: 24,
    flex: 4
  },
  unitPrice: {
    flexDirection: 'row',
    fontSize: 16,
    lineHeight: 32,
    flex: 2
  },
  x: {
    flexDirection: 'row',
    fontSize: 16,
    lineHeight: 32,
    flex: 1
  },
  quantity: {
    flexDirection: 'row',
    fontSize: 16,
    lineHeight: 32,
    flex: 1
  },
  subTotal: {
    flexDirection: 'row',
    fontSize: 20,
    lineHeight: 32,
    flex: 2
  },
  total: {
    fontSize: 24,
    padding: 16
  },
  button: {
    height: 40,
    padding: 8,
    backgroundColor: '#ccc'
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
