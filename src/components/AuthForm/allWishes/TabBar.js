import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AllWishes from '.';
import {useFocusEffect} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const AllWishess = ({route, navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarBadge:1,
        tabBarActiveTintColor: '#1273DE',
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {marginTop: 10},
      }}>
      <Tab.Screen name="Active" component={AllWishes} />
      <Tab.Screen name="Non-Active" component={AllWishes} />
    </Tab.Navigator>
  );
};

export default AllWishess;

const styles = StyleSheet.create({});
