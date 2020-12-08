import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AreaRestrita(props) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function getUser() {
      let response = await AsyncStorage.getItem('userData')
      let json = JSON.parse(response)
      setUser(json.name)
    }
    getUser()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Essa é a área Restrita</Text>
      <Text>Seja bem vindo {user}</Text>
    </View>
  );
}

export default AreaRestrita
