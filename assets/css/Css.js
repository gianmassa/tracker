import { StyleSheet } from 'react-native'

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPage: {
    backgroundColor: 'orange',
    padding: 20,
  },
  icon: {
    width: 100,
    height: 100,
  },
  logo: {
    width: 120,
    height: 48,
  },
  buttonHome: {
    margin: 15,
  },
  darkbg: {
    backgroundColor: '#333',
  },
  login__logo: {
    marginBottom: 20
  },
  login__msg:{
    fontWeight: 'bold',
    fontSize: 22,
    color: 'red',
    marginTop: 20,
    marginBottom: 20,
  },
  login__form: {
    width: '80%',
  },
  login__input: {
    backgroundColor: '#fff',
    fontSize: 19,
    padding: 7,
    marginBottom: 15,
  },
  login__button: {
    padding: 12,
    backgroundColor: '#f58634',
    alignSelf: 'center',
    borderRadius: 5,
  },
  login__buttonText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#333',
  },
  hidden: {
    display: 'none',
  }
});

export {css}
