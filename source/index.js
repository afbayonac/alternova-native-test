import registerRootComponent from 'expo/build/launch/registerRootComponent'
import { useFonts } from 'expo-font'

import { StatusBar, View, Text } from 'react-native'
import Home from './views/Home'
import { NativeRouter, Route, Routes } from 'react-router-native'
import Header from './components/Header'

const Root = () => {
  const [loaded] = useFonts({
    DynaPuff: require('./assets/fonts/DynaPuff.ttf'),
    Mulish: require('./assets/fonts/Mulish.ttf')
  })

  if (!loaded) {
    return null
  }

  return (
    <View>
      <StatusBar style='auto' />
      <NativeRouter>
        <Header />
        <Routes>
          <Route
            exact
            path='/'
            element={<Home />}
          />
          <Route
            exact
            path='/:id'
            element={<Text>detail</Text>}
          />
          <Route
            exact
            path='/cart'
            element={<Text>cart</Text>}
          />
        </Routes>
      </NativeRouter>
    </View>
  )
}

registerRootComponent(Root)
