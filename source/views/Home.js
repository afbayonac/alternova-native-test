import { Text, FlatList } from 'react-native'

const products = [
  {
    id: 'p'
  },
  {
    id: 'k'
  }
]

const Home = () => {
  const renderProduct = ({ item }) => {
    return <Text>{item.id}</Text>
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id}
    />
  )
}

export default Home
