import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import AllWishess from '../allWishes/TabBar';
import Login from '../authForm/Login';
import RegisterForm from '../authForm/RegisterForm';
import Bucket from 'react-native-vector-icons/MaterialCommunityIcons';
import User from 'react-native-vector-icons/Feather';
import UserInfo from '../userInfo';
import MyActivityIndicator from '../userInfo/Activity';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarActiveTintColor: '#1273DE',
        // tabBarInactiveBackgroundColor: '#7bdcb5',
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 25,
          right: 25,
          backgroundColor: '#ffffff',
          elevation: 0,
          height: 70,
          borderRadius: 15,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Wish"
        options={{
          tabBarIcon: ({color, size}) => (
            <Bucket name="bucket-outline" color={color} size={size} />
          ),
        }}
        component={AllWishess}
      />
      <Tab.Screen
        name="Login"
        options={{
          tabBarIcon: ({color, size}) => (
            <User name="user" color={color} size={size} />
          ),
        }}
        component={Login}
      />
      <Tab.Screen
        name="Register"
        options={{
          tabBarIcon: ({color, size}) => (
            <User name="user" color={color} size={size} />
          ),
        }}
        component={UserInfo}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    opacity: 0.35,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
