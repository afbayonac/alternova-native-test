import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native'
import { useDispatch } from 'react-redux'
import { add } from '../store/products'

const { Item } = Picker

const Product = ({ item }) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState('1')

  const handleQuantity = (value) => {
    setQuantity(value)
  }

  const handleCart = (value) => {
    dispatch(add({ id: item.id, quantity: Number(quantity) }))
  }

  return (
    <View style={styles.product}>
      <Link
        to={`/${item.id}`}
        activeOpacity={0}
        underlayColor='transparent'
      >
        <View>
          <View style={styles.figure}>
            <Image style={styles.image} source={{ uri: item.image }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>$ {item.unit_price}</Text>
          </View>
        </View>

      </Link>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Text style={{ width: 70, paddingVertical: 17 }}> Cantidad: </Text>
        <Picker
          color='red'
          itemStyle={{ height: 44 }}
          style={styles.picker}
          selectedValue={quantity}
          onValueChange={handleQuantity}
          onPress={() => {}}
          label='cantidad'
          enabled={item.stock > 1}
        >
          {
            Array(item.stock)
              .fill('')
              .map((_, i) => <Item key={i} label={`${i + 1}`} value={`${i + 1}`} />)
          }
        </Picker>

      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleCart}
        disabled={item.stock < 1}
      >
        <Text style={styles.buttonText}>Agregar al Carro</Text>
      </TouchableOpacity>
    </View>
  )
}

const shadowColor = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5
}

const styles = StyleSheet.create({
  product: {
    backgroundColor: '#aaaaaa',
    margin: 16,
    borderRadius: 5,
    overflow: 'hidden',
    ...shadowColor
  },
  figure: {
    padding: 16,
    backgroundColor: '#FFFFFF'
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'center',
    backgroundColor: '#FFFF'
  },
  name: {
    fontFamily: 'Mulish',
    fontSize: 20,
    paddingVertical: 8,
    fontWeight: '800'
  },
  price: {
    fontFamily: 'Mulish',
    fontSize: 20,
    paddingVertical: 8,
    fontWeight: '650'
  },
  picker: {
    width: 80
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

export default Product
