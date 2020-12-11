import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {css} from '../assets/css/Css'
import config from '../config/config.json'

function Rastreio(props) {
  const [code, setCode] = useState(null)
  const [codeSystem, setCodeSystem] = useState("SAP")
  const [msg, setMsg] = useState(null)

  //Enviado o formulário
  const sendForm = async function () {
    let response = await fetch(`${config.urlRoot}api/tracking/track`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: code,
        codeSystem: codeSystem,
        status: null
      })
    })
    let json = await response.json()
    setMsg(json)
  }

  return (
    <View style={css.container}>
      <View style={css.ratreio__logo}>
        <Image style={css.rastreio__img} source={require('../assets/images/rastreio.png')}/>
        <Text style={css.rastreio__Title}>Rastreio</Text>
      </View>
      <View>
        <Text style={
            msg === 'Pedido Não Encontrado' ? css.rastreio_status_fail : css.rastreio__status
          }
        >{msg}</Text>
      </View>
      <View style={css.login__form}>
        <Picker
          selectedValue={codeSystem}
          style={[{height: 50, width: '100%'}, css.rastreio__picker]}
          onValueChange={(itemValue, itemIndex) => {
              setCodeSystem(itemValue)
            }
          }>
          <Picker.Item label="Código SAP" value="SAP" />
          <Picker.Item label="Código Zoey" value="ZOEY" />
        </Picker>
        <TextInput style={[css.login__input, css.rastreio__input]} placeholder="Código do Produto" onChangeText={text => setCode(text)} />
        <TouchableOpacity style={css.login__button} onPress={sendForm} >
          <Text style={css.login__buttonText}>Rastrear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Rastreio
