import { Text, View, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'

const Header = () => {
  // useEffect(() => {
  //   fetch()
  // })

  return (
    <View style={styles.header}>
      <Link to='/' underlayColor='transparent'>
        <Text style={styles.arrow}>⌂</Text>
      </Link>
      <Text style={styles.lego}>Lego</Text>
      <Text style={styles.shop}>Shop</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    // backgroundColor: 'gray',
    flexDirection: 'row'
  },
  arrow: {
    fontSize: 24,
    backgroundColor: 'gray',
    lineHeight: 35,
    color: 'white',
    width: 40,
    height: 40,
    marginTop: 10,
    textAlign: 'center',
    marginLeft: 16,
    borderRadius: 20
  },
  lego: {
    fontSize: 24,
    color: 'gray',
    fontFamily: 'DynaPuff',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 60,
    paddingLeft: 8,
    marginLeft: 8
  },
  shop: {
    fontSize: 24,
    color: 'orange',
    fontFamily: 'DynaPuff',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 60,
    paddingHorizontal: 8
  }
})

export default Header
