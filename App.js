import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/Routes';
import AllWishes from './src/components/AuthForm/allWishes';

const App = () => {
  return (
<NavigationContainer>
  <Routes/>
  {/* <AllWishes/> */}
</NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})