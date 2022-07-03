import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../authForm/Login';
import RegisterForm from '../authForm/RegisterForm';

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation, stack}) => (
  <RootStack.Navigator>
    {/* <RootStack.Screen name="Register" component={RegisterForm} /> */}
    <RootStack.Screen name="Login" component={Login} />
  </RootStack.Navigator>
);

export default RootStackScreen;
