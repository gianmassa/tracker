import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { css } from '../assets/css/Css'
import AsyncStorage from '@react-native-async-storage/async-storage';

import MenuAreaRestrita from '../assets/components/MenuAreaRestrita'

function Edicao({ navigation }) {

  return (
    <View style={[css.container, css.containerTop]}>
      <MenuAreaRestrita title="Edição" navigation={navigation} />
    </View>
  );
}

export default Edicao
