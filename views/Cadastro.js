import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { css } from '../assets/css/Css'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser, getUserID } from '../utils'
import config from '../config/config.json'

import MenuAreaRestrita from '../assets/components/MenuAreaRestrita'

function Cadastro({ navigation }) {
  const [code, setCode] = useState(null)
  const [user, setUser] = useState(null)
  const [SAPorder, setSAPorder] = useState(null)
  const [ZOEYorder, setZOEYorder] = useState(null)
  const [status, setStatus] = useState(config.initialStep)
  const [response, setResponde] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    async function getUser() {
      let response = await AsyncStorage.getItem('userData')
      let json = JSON.parse(response)
      setUser(json.id)
    }
    getUser()
  }, [])

  useEffect(() => {
    randomCode()
  }, [])

  // Generate a random code and attribute it to the const code
  async function randomCode() {
     const length = 20
     let result           = '';
     const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     const charactersLength = characters.length;
     for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     setCode(result)
  }

  // Envio do Formulario
  async function sendForm() {
    let response = await fetch(`${config.urlRoot}api/tracking/createOrder`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: code,
        userId: user,
        sapCode: SAPorder,
        zoeyCode: ZOEYorder,
        status: status
      })
    })
    let json = await response.json()
    setMsg(json)
  }

  return (
    <View style={[css.container, css.containerTop]}>
      <MenuAreaRestrita title="Cadastro" navigation={navigation} />

      <View style={css.login__input}>
        <TextInput placeholder="Codigo SAP do Pedido" onChangeText={text => setSAPorder(text)} />
        <TextInput placeholder="Codigo Zoey do Pedido" onChangeText={text => setZOEYorder(text)} />
        <Picker
          selectedValue={status}
          style={{height: 50, width: '100%'}}
          onValueChange={(itemValue, itemIndex) => {
              setStatus(itemValue)
            }
          }>
          <Picker.Item label="Pedido Recebido" value="Pedido Recebido" />
          <Picker.Item label="Aguardando NF" value="Aguardando NF" />
          <Picker.Item label="Nota Fiscal Gerada" value="Nota Fiscal Gerada" />
          <Picker.Item label="Separando Estoque" value="Separando Estoque" />
          <Picker.Item label="Pedido a caminho" value="Pedido a caminho" />
          <Picker.Item label="Pedido Entregue" value="Pedido Entregue" />
        </Picker>
      </View>

      <TouchableOpacity style={css.login__button} onPress={sendForm}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>

      <View>
        <Text>{msg}</Text>
      </View>
    </View>
  );
}

export default Cadastro
