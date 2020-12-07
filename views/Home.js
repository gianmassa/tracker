import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { css } from '../assets/css/Css'

function Home(props) {
  const { navigation } = props
  return (
    <View style={css.container2}>
      <TouchableOpacity
        style={css.buttonHome}
        onPress={() => navigation.navigate('Login', {
          id: 30,
        })}>
        <Image style={css.icon} source={require('../assets/images/log-in.png')} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Rastreio', {
          id: 30,
        })}>
        <Image style={css.icon} source={require('../assets/images/location.png')} />
      </TouchableOpacity>
    </View>
  );
}

export default Home
