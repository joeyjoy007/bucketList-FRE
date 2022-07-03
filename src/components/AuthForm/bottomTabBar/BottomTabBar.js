import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import AllWishess from '../allWishes/TabBar';
import Login from '../authForm/Login';
import RegisterForm from '../authForm/RegisterForm';
import WishIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import User from 'react-native-vector-icons/Entypo';
import UserInfo from '../userInfo';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#1273DE',
        tabBarInactiveBackgroundColor: '#7bdcb5',
        tabBarStyle: {
          backgroundColor: '#8ed1fc',
          height: 50,
          marginBottom: 30,
          width: width - 40,
          left: width - 375,
          borderRadius: 30,
        },
      }}>
      <Tab.Screen
        name="Wish"
        options={{
          tabBarIcon: ({color, size}) => (
            <WishIcon name="hands-pray" color={color} size={size} />
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

const styles = StyleSheet.create({});
