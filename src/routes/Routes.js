import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useReducer } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/AuthForm/authForm/Login';
import RegisterForm from '../components/AuthForm/authForm/RegisterForm';
import AllWishes from '../components/AuthForm/allWishes';
import WishView from '../components/AuthForm/wishView';

const Routes = () => {

    const Stack = createNativeStackNavigator();

    const initialLoginState = {
        isLoading:true,
        userToken:undefined
    }

    const loginReducer = (prevState,action)=>{
        switch(action.type){
            case 'RETRIVE_TOKEN':
                return{
                    ...prevState,
                    isLoading:false,
                    userToken:true
                }
            
                case 'LOGIN':
                    return{
                        ...prevState,
                        isLoading:false,
                        userToken:true
                    }

                case 'LOGOUT':
                    return{
                        ...prevState,
                        userToken:undefined,
                        isLoading:false
                    }
                
                case 'SIGNUP':
                    return{
                        ...prevState,
                        isLoading:false,
                        userToken:true
                    }
        }
    }

    const [loginState, dispatch] = useReducer(loginReducer,initialLoginState)


    const authContext = useMemo(()=>{
        ({
            signIn:async(data)=>{

            }
            
        })
    })


  return (
    <Stack.Navigator>
    {/* <Stack.Screen name="AllWish" component={AllWishes} />
    <Stack.Screen name="WishView" component={WishView} /> */}
    <Stack.Screen name="Register" component={RegisterForm} />
    <Stack.Screen name="Login" component={Login} />
    
  </Stack.Navigator>
  )
}

export default Routes

const styles = StyleSheet.create({})