import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Image, TouchableOpacity, Platform } from 'react-native';
import { css } from '../assets/css/Css'

function Login(props) {
  const [showMsg, setShowMsg] = useState(false)

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
        <TextInput style={css.login__input} placeholder="Usuário" />
        <TextInput style={css.login__input} placeholder="Senha" secureTextEntry={true} />
        <TouchableOpacity style={css.login__button} onPress={() => setShowMsg(true)}>
          <Text style={css.login__buttonText}>Fazer Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Login
