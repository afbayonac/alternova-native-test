import { useState } from 'react'
import { Text, View, StyleSheet, StatusBar, Switch } from 'react-native'
import { Link } from 'react-router-native'
import { useSelector } from 'react-redux'

const Header = () => {
  const [isEnabled, setIsEnable] = useState()
  const user = useSelector(state => state.user.active)

  const toggleSwitch = () => {
    setIsEnable(!isEnabled)
  }

  return (
    <View style={styles.header}>
      <StatusBar style='auto' />
      <View style={{ flexDirection: 'row' }}>
        {
          user &&
            <Link to='/' underlayColor='transparent'>
              <Text style={styles.arrow}>⌂</Text>
            </Link>
        }
        <Text style={styles.lego}>Lego</Text>
        <Text style={styles.shop}>Shop</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Switch
          style={{ marginTop: 4 }}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        {
          user &&
            <Link to='/cart' underlayColor='transparent'>
              <Text style={styles.cart}> 🛒</Text>
            </Link>
        }
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    // backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16
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
  },
  cart: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 60,
    paddingHorizontal: 8
  }
})

export default Header
