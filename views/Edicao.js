import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { css } from '../assets/css/Css'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser, getUserID } from '../utils'
import config from '../config/config.json'

import MenuAreaRestrita from '../assets/components/MenuAreaRestrita'

function Edicao({ navigation }) {
  const [code, setCode] = useState(null)
  const [user, setUser] = useState(null)
  const [codeSystem, setCodeSystem] = useState('SAP')
  const [status, setStatus] = useState(config.initialStep)
  const [msg, setMsg] = useState('')
  const [response, setResponse] = useState(null)

  useEffect(() => {
    async function getUser() {
      let response = await AsyncStorage.getItem('userData')
      let json = JSON.parse(response)
      setUser(json.id)
    }
    getUser()
  }, [])

  // Envio do Formulario
  async function sendForm() {
    let response = await fetch(`${config.urlRoot}api/tracking/updateOrder`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: code,
        userId: user,
        status: status,
        codeSystem: codeSystem
      })
    })
    let json = await response.json()
    setResponse(Math.random())
    setMsg(json)
    setTimeout(() => {
      setMsg(null)
    }, 3000)
  }

  return (
    <View style={[css.container, css.containerTop]}>
      <MenuAreaRestrita title="Edição" navigation={navigation} />

      <View style={css.login__input}>
        <Picker
          selectedValue={codeSystem}
          style={{height: 50, width: '100%'}}
          onValueChange={(itemValue, itemIndex) => {
              setCodeSystem(itemValue)
            }
          }>
          <Picker.Item label="Código SAP" value="SAP" />
          <Picker.Item label="Código Zoey" value="ZOEY" />
        </Picker>

        <TextInput placeholder="Codigo do Pedido" onChangeText={text => setCode(text)} />

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

export default Edicao
