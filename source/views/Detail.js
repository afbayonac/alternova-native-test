import { Picker } from '@react-native-picker/picker'
import { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-native'
import { add } from '../store/products'

const { Item } = Picker

const Detail = () => {
  const { id } = useParams()
  const idCast = Number(id)
  const dispatch = useDispatch()

  const item = useSelector(state => state.product.list.find(item => item.id === idCast))
  const [quantity, setQuantity] = useState('1')
  const [extraData, setExtraData] = useState({})

  const handleCart = (value) => {
    dispatch(add({ id: item.id, quantity: Number(quantity) }))
  }

  const handleQuantity = (value) => {
    setQuantity(value)
  }

  useEffect(() => {
    const getExtaData = async () => {
      const response = await await fetch(`http://192.168.20.109:3100/detail/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json' // I added this line
        }
      })

      if (response.status !== 200) throw new Error('inespected code')

      const data = await response.json()
      setExtraData(data)
    }

    getExtaData()
  }, [id])

  if (!item) return null

  return (
    <ScrollView style={styles.detail}>
      <View style={styles.figure}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>$ {item.unit_price}</Text>
      </View>
      <Text style={styles.description}>$ {extraData.description}</Text>
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  detail: {
    alignContent: 'center',
    flex: 1
  },
  product: {
    backgroundColor: '#aaaaaa',
    margin: 16,
    borderRadius: 5,
    overflow: 'hidden'
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
    fontSize: 24,
    paddingVertical: 8,
    fontWeight: '800'
  },
  price: {
    fontFamily: 'Mulish',
    fontSize: 24,
    paddingVertical: 8,
    fontWeight: '650'
  },
  description: {
    paddingHorizontal: 16,
    textAlign: 'justify'
  },
  picker: {
    width: 80
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

export default Detail
