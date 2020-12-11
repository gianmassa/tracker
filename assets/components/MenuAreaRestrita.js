import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { css } from '../css/Css'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'

export default function MenuAreaRestrita({ title, navigation }) {
  async function logout() {
    await AsyncStorage.clear()
    navigation.navigate('Login')
  }

  return (
    <View style={css.area__menu} >

      <TouchableOpacity style={css.button__home} onPress={()=>{navigation.navigate('Home')}}>
        <Icon name="home" size={20} color="#999" />
      </TouchableOpacity>

      <Text style={css.area__title}>{title}</Text>

      <TouchableOpacity style={css.button__logout} onPress={()=>logout()}>
        <Icon name="sign-out" size={20} color="#999" />
      </TouchableOpacity>

    </View>
  );
}
