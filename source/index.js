import registerRootComponent from 'expo/build/launch/registerRootComponent'
import { useFonts } from 'expo-font'
import Home from './views/Home'
import { NativeRouter, Route, Routes } from 'react-router-native'
import Header from './components/Header'

import { store } from './store/store'
import { Provider, useSelector } from 'react-redux'
import Cart from './views/Cart'
import Detail from './views/Detail'
import Login from './views/Login'

const App = () => {
  const user = useSelector(state => state.user.active)

  return (
    <NativeRouter>
      <Header />
      {
        user
          ? (
            <Routes>
              <Route
                exact
                path='/'
                element={<Home />}
              />
              <Route
                exact
                path='/:id'
                element={<Detail />}
              />
              <Route
                exact
                path='/cart'
                element={<Cart />}
              />
            </Routes>
            )
          : (
            <Routes>
              <Route
                exact
                path='/'
                element={<Login />}
              />
            </Routes>
            )
      }
    </NativeRouter>
  )
}

const Root = () => {
  const [loaded] = useFonts({
    DynaPuff: require('./assets/fonts/DynaPuff.ttf'),
    Mulish: require('./assets/fonts/Mulish.ttf')
  })

  if (!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

registerRootComponent(Root)
