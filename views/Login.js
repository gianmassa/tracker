import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Image, TouchableOpacity, Platform } from 'react-native';
import { css } from '../assets/css/Css'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication'

function Login({ navigation }) {
  const [showMsg, setShowMsg] = useState(false)
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState(null)
  const [login, setLogin] = useState(false)

  const changeUserHandler = (text) => {setUser(text)}
  const changePasswordHandler = (text) => {setPassword(text)}


  useEffect(() => {
    verifyLogin()
  }, [])

  useEffect(() => {
    if (login === true) {
      biometric()
    }
  }, [login])

  // Verificar se o usuário já fez algum login
  async function verifyLogin() {
    let response = await AsyncStorage.getItem('userData')
    let json = await JSON.parse(response)

    if (json !== null) {
      setUser(json.name)
      setPassword(json.password)
      setLogin(true)
    }
  }


  //Biometria
  async function biometric() {
    let compatible = await LocalAuthentication.hasHardwareAsync()
    if(compatible) {
      let biometricRecords = await LocalAuthentication.isEnrolledAsync()
      if(!biometricRecords) {alert('biometria não cadastrada')}
      else {
        let result = await LocalAuthentication.authenticateAsync()
        if(result.success){sendForm()}
        else {
          setUser(null)
          setPassword(null)
        }
      }
    }
  }


  // Envio do formulário de login
  async function sendForm() {
    let response = await fetch('http://192.168.15.4:3001/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user,
        password: password
      })
    })
    let json = await response.json()
    if(json === 'error'){
      setShowMsg(true)
      setTimeout(() => {
        setShowMsg(false)
      }, 3000)
      await AsyncStorage.clear()
    }
    else {
      await AsyncStorage.setItem('userData', JSON.stringify(json))
      navigation.navigate('AreaRestrita')
    }
  }

  return (
    <KeyboardAvoidingView style={[css.container, css.darkbg]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }>
      <View style={css.login__logo}>
        <Image style={css.logo} source={require('../assets/images/logo.png')}/>
      </View>

      <View>
        <Text style={showMsg ? css.login__msg : [css.login__msg, css.hidden]}>Usuário ou Senha inválidos</Text>
      </View>

      <View style={css.login__form}>
        <TextInput style={css.login__input} placeholder="Usuário" onChangeText={changeUserHandler}/>
        <TextInput style={css.login__input} placeholder="Senha" secureTextEntry={true} onChangeText={changePasswordHandler}/>
        <TouchableOpacity style={css.login__button} onPress={() => sendForm()}>
          <Text style={css.login__buttonText}>Fazer Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Login
