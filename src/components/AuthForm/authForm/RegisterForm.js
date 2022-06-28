import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';

const RegisterForm = ({navigation}) => {

  const [formState, setFormState] = useState({emai:"",password:"",name:"",phoneNumber:"",type:""})
  const [errorText, setErrorText] = useState("")

  return (
    <View style={styles.mainView}>
      <Text style={styles.welcomeText}>Register here !</Text>
      <View>
        <TextInput placeholder='Name'  style={styles.textStyle} />

        <TextInput placeholder='Email' keyboardType="email-address" style={styles.textStyle} />

        <TextInput placeholder='Password' secureTextEntry={true} autoCapitalize='none' autoCorrect={false} style={styles.textStyle} />

        <TextInput placeholder='Phone number' keyboardType="number-pad" style={styles.textStyle} />

        <TextInput placeholder='Type' autoCapitalize='none' autoCorrect={false} style={styles.textStyle} />
      </View>
      <Text style={styles.forgotText}>Forgot password?</Text>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Login")}>
        <Text style={{fontSize:17,fontWeight:"600"}}>Continue </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  textStyle: {
    marginTop:20,
    borderRadius:7,
    backgroundColor:"#3F4E4F"
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal:20
  },
  forgotText:{
    alignSelf:"flex-end",
    marginTop:15
  },
  button:{
    height:50,
    borderRadius:7,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"rgb(93, 95, 222)",
    marginTop:20
  },
  welcomeText:{
    color:"#ffffff",
    fontSize:28,
    fontWeight:"bold"
  },
  signText:{

  }
});RegisterForm