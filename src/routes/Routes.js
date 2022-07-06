import {StyleSheet, Text, View} from 'react-native';
import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
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
import ParentForm from '../components/AuthForm/parentform';

export const RefreshState = createContext();
export const RefreshBucket = createContext();

const Routes = () => {
  const Stack = createNativeStackNavigator();

  const [refreshState, setRefreshState] = useState(false);
  const [refreshBucket, setRefreshBucket] = useState(false);

  const initialLoginState = {
    isLoading: true,
    userToken: undefined,
    type: undefined,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIVE_TOKEN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.di.token,
          userType: action.di.type,
        };

      case 'LOGIN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.di.token,
          userType: action.di.type,
        };

      case 'LOGOUT':
        return {
          ...prevState,
          userToken: undefined,
          isLoading: false,
          userType: undefined,
        };

      case 'SIGNUP':
        return {
          ...prevState,
          isLoading: false,
          userToken: true,
          userType: undefined,
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
            await Storage.setItem('userType', response.payload.user.type);
            const getToken = await Storage.getItem('token');
            await Storage.setItem('userInfo', response.payload);
            dispatch({
              type: 'LOGIN',
              di: {
                token: await Storage.getItem('token'),
                type: await Storage.getItem('userType'),
              },
            });

            //  ToastHOC.successAlert('Login Success ', response.message);
            console.log(await Storage.getItem('userType'));
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
          await Storage.removeItem('token');
          await Storage.removeItem('userInfo');
          await Storage.removeItem('userType');
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
      let userType;
      userToken = undefined;
      userType = undefined;
      try {
        userToken = await Storage.getItem('token');
        userType = await Storage.getItem('userType');
        // console.log('USERTOKEN', userToken);
        // console.log('USERINFO', await Storage.getItem('userInfo'));
      } catch (error) {
        console.log(error);
      }
      dispatch({type: 'RETRIVE_TOKEN', di: {token: userToken, type: userType}});
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <RefreshState.Provider value={{refreshState, setRefreshState}}>
        <RefreshBucket.Provider value={{refreshBucket, setRefreshBucket}}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {loginState.userToken !== undefined ? (
              <>
                <Stack.Screen name="BottomTabBar" component={BottomTabBar} />
                <Stack.Screen name="UserWishes" component={UserWishes} />
                {loginState.userType === 'father' ? (
                  <>
                    <Stack.Screen name="ParentForm" component={ParentForm} />
                  </>
                ) : null}
              </>
            ) : (
              <Stack.Screen name="Auth" component={RootStackScreen} />
            )}
          </Stack.Navigator>
        </RefreshBucket.Provider>
      </RefreshState.Provider>
    </AuthContext.Provider>
  );
};

export default Routes;

const styles = StyleSheet.create({});
