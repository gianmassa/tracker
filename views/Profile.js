import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { css } from '../assets/css/Css'
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config/config.json'

import MenuAreaRestrita from '../assets/components/MenuAreaRestrita'

function Profile({ navigation }) {

  const [idUser, setIdUser] = useState('')
  const [senhaAntiga, setSenhaAntiga] = useState('')
  const [senhaNova, setSenhaNova] = useState('')
  const [confSenhaNova, setConfSenhaNova] = useState('')
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    async function getIdUser() {
      let response = await AsyncStorage.getItem('userData')
      let json = JSON.parse(response)
      setIdUser(json.id)
    }
    getIdUser()
  })

  async function sendForm() {
    let response = await fetch(`${config.urlRoot}api/user/verifyPass`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: idUser,
        senhaAntiga: senhaAntiga,
        senhaNova: senhaNova,
        confSenhaNova: confSenhaNova
      })
    })
    let json = await response.json()
    setMsg(json)
  }

  return (
    <View style={[css.container, css.containerTop]}>
      <MenuAreaRestrita title="Perfil" navigation={navigation} />

      <View>
        <Text>{msg}</Text>
        <TextInput placeholder="Senha Antiga" onChangeText={text=>setSenhaAntiga(text)}/>
        <TextInput placeholder="Nova Senha" onChangeText={text=>setSenhaNova(text)}/>
        <TextInput placeholder="Confirmação da Nova Senha" onChangeText={text=>setConfSenhaNova(text)}/>

        <TouchableOpacity onPress={sendForm}>
          <Text>Trocar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Profile
