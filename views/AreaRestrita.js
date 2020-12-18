import React, {useState, useEffect} from 'react';
import { View, Text, Alert, BackHandler } from 'react-native';
import {css} from '../assets/css/Css'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Profile from './Profile'
import Cadastro from './Cadastro'
import Edicao from './Edicao'

function AreaRestrita({ navigation }) {
  const Tab = createMaterialBottomTabNavigator();

  const [user, setUser] = useState(null)

  //Get what user is in the logged area and send to the Async Storage, also save in the user variable
  useEffect(() => {
    async function getUser() {
      let response = await AsyncStorage.getItem('userData')
      let json = JSON.parse(response)
      setUser(json.name)
    }
    getUser()
  }, [])

  // BACKHANDLER ***
  // ***************
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Alerta", "Deseja mesmo sair do app?", [
        {
          text: "Não",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Sim", onPress: () => {
            navigation.navigate('Home')
            BackHandler.exitApp()
          }
        }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  // Return da Área Restruita **********
  return (
    <Tab.Navigator
      activeColor="#999"
      inactiveColor="#fff"
      barStyle={css.area__tab}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ()=>(<Icon name="users" size={20} color="#999" />)
        }}
      />
      <Tab.Screen
        name="Cadastro"
        component={Cadastro}
        options={{
          tabBarIcon: ()=>(<Icon name="archive" size={20} color="#999" />)
        }}
      />
      <Tab.Screen
        name="Edicao"
        component={Edicao}
        options={{
          tabBarIcon: ()=>(<Icon name="edit" size={20} color="#999" />)
        }}
      />
    </Tab.Navigator>
  );
}

export default AreaRestrita
