import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/Routes';
import AllWishes from './src/components/AuthForm/allWishes';
import { initializeAxios } from './src/server';

const App = () => {

  const appInitialize = async()=>{
    console.log("axios seted up")
    initializeAxios()
  }

  useMemo(() => 
  appInitialize()
  , [])

  return (
<NavigationContainer>
  <Routes/>
  {/* <AllWishes/> */}
</NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})