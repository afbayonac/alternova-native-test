import registerRootComponent from 'expo/build/launch/registerRootComponent'

import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Home from './views/Home'
import { NativeRouter, Route, Routes } from 'react-router-native'

const Root = () => {
  return (
    <View>
      <View><Text>legoShop</Text></View>
      <NativeRouter>
        <Routes>
          <Route
            exact
            path='/'
            element={<Home />}
          />
          <Route
            exact
            path='/:id'
            element={<Home />}
          />
        </Routes>
      </NativeRouter>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top: 20
  }
})

registerRootComponent(Root)
