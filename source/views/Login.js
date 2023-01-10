import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

import { initializeApp } from 'firebase/app'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { register } from '../store/user'
import { firebaseConfig } from '../../gobals'

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const handleEmail = (v) => {
    setEmail(v)
  }

  const handlePassword = (value) => {
    setPassword(value)
  }

  const handleSummit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch(register())
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!')
        }

        console.error(error)
      })
  }

  return (
    <View style={styles.login}>
      <View style={styles.card}>
        <Text>Correo:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={handleEmail}
          placeholder='alternova@domain.com'
        />

        <Text>Contraseña:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={handlePassword}
          placeholder='alternova'
        />

        <TouchableOpacity style={styles.button} onPress={handleSummit}>
          <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  login: {
    justifyContent: 'center',
    flex: 1
  },
  input: {
    marginBottom: 8,
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    paddingHorizontal: 8
  },
  card: {
    height: 300,
    margin: 16,
    alignContent: 'center'
  },
  button: {
    height: 40,
    padding: 8,
    backgroundColor: '#ccc',
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'orange',
    textAlign: 'center',
    fontFamily: 'DynaPuff'

  }
})

export default Login
