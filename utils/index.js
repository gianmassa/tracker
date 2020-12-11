import AsyncStorage from '@react-native-async-storage/async-storage';

//Get what user is in the logged area and send to the Async Storage, also save in the user variable
  async function getUser() {
    let response = await AsyncStorage.getItem('userData')
    let json = JSON.parse(response)
    return json.name
  }

  async function getUserID() {
    let response = await AsyncStorage.getItem('userData')
    let json = JSON.parse(response)
    return json._id
  }

  export { getUser, getUserID }
