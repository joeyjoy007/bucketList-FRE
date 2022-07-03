import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useReducer} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../components/AuthForm/authForm/Login';
import RegisterForm from '../components/AuthForm/authForm/RegisterForm';
import AllWishes from '../components/AuthForm/allWishes';
import WishView from '../components/AuthForm/wishView';
import AllWishess from '../components/AuthForm/allWishes/TabBar';
import BottomTabBar from '../components/AuthForm/bottomTabBar/BottomTabBar';
import RootStackScreen from '../components/AuthForm/RootStackScreen/RootStackScreen';
import {loginUser} from '../server/apis/user';
import {AuthContext} from '../context';
import {Storage} from '../storage/Storage';
import UserWishes from '../components/AuthForm/userInfo/userWishes';

const Routes = () => {
  const Stack = createNativeStackNavigator();

  const initialLoginState = {
    isLoading: true,
    userToken: undefined,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIVE_TOKEN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token,
        };

      case 'LOGIN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token,
        };

      case 'LOGOUT':
        return {
          ...prevState,
          userToken: undefined,
          isLoading: false,
        };

      case 'SIGNUP':
        return {
          ...prevState,
          isLoading: false,
          userToken: true,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // setUserToken("TokenExist")
        // setIsLoading(false)
        try {
          console.log('DATA', data);
          const response = await loginUser(data);
          console.log(response.status);
          if (response.status === 1) {
            await Storage.setItem('token', response.payload.token);
            const getToken = await Storage.getItem('token');
            await Storage.setItem('userInfo', response.payload);
            dispatch({type: 'LOGIN', token: await Storage.getItem('token')});

            //  ToastHOC.successAlert('Login Success ', response.message);

            console.log(userInfo);
            // axios.defaults.headers.common['Authorization'] = response.token;
            // navigation.navigate('BottomTabBar');
          } else {
            //  ToastHOC.errorAlert('Login failed');
            console.log('Login Failed');
          }
        } catch (error) {
          //    ToastHOC.errorAlert(error.message);
          console.log('ff', error);
        }
      },
      signOut: async () => {
        // setUserToken(null)
        // setIsLoading(false)
        try {
          console.log(await Storage.getItem('userInfo'));
          console.log(await Storage.getItem('token'));
          await Storage.removeItem('token');
          await Storage.removeItem('userInfo');
        } catch (error) {
          console.log(error.message);
        }
        dispatch({type: 'LOGOUT'});
        // ToastHOC.infoAlert('User Logout');
      },
      signUp: () => {
        // setIsLoading(false)
        // setUserToken("TokenExist")
      },
    }),
    [],
  );
  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = undefined;
      try {
        userToken = await Storage.getItem('token');
        // console.log('USERTOKEN', userToken);
        // console.log('USERINFO', await Storage.getItem('userInfo'));
      } catch (error) {
        console.log(error);
      }
      dispatch({type: 'RETRIVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {loginState.userToken !== undefined ? (
          <>
            <Stack.Screen name="BottomTabBar" component={BottomTabBar} />
            <Stack.Screen name="UserWishes" component={UserWishes} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={RootStackScreen} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};

export default Routes;

const styles = StyleSheet.create({});
