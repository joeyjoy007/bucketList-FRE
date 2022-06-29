import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import { emailValidation } from '../../../helpers/helpers';
import { loginUser } from '../../../server/apis/user';

const Login = ({navigation}) => {
  const [formState, setFormState] = useState({email: '', password: ''});
  const [errorText, setErrorText] = useState("")
  const [loading, setLoading] = useState(false)

  const setfields = (key,value) => {
    setFormState({...formState,[key]:value})
  };

  const updateError = (error,setErrorText)=>{
    setErrorText(error)
    setTimeout(() => {
      setErrorText("")
    }, 2000);
  }

  const validObj = (obj)=>{
    return Object.values(obj).every(value=>value.trim())
  }

  const validateFields = ()=>{
    const {email,password} = formState

    if(!validObj(formState)) return updateError("Fill all fields",setErrorText)

    if(!emailValidation.test(email)) return updateError("Write email correctly",setErrorText)

    if(!password.trim || password.length<6) return updateError("Password must be of atleast 6 character",setErrorText)

    return true
  }

  const Login = async (data)=>{
    setLoading(true)
    if(validateFields()){
      setLoading(true)
      try {
        const response = await loginUser(data)
        if(response.status === 1){
          setLoading(false)
          navigation.navigate("AllWish")
        }
      } catch (error) {
        console.log(error)
      }
    }
    else{
      // alert("FAILED")
      
    }

  }

  return (
    <View style={styles.mainView}>
      <Text style={styles.welcomeText}>Welcome back !</Text>
      <Text style={styles.signText}>Sign into your account</Text>
      <View>
       {errorText.length>1 ? <Text style={{color:"red",fontSize:17,marginTop:20}}>{errorText}</Text>:null}
        <TextInput
          value={formState.email}
          onChangeText={(email)=>setfields('email',email)}
          autoCapitalize="none"
          placeholder="Email"
          style={styles.textStyle}
        />

        <TextInput
          placeholder="Password"
          value={formState.password}
          onChangeText={(password)=>setfields('password',password)}
          autoCapitalize="none"
          style={styles.textStyle}
        />
      </View>
      <Text style={styles.forgotText}>Forgot password?</Text>
      <TouchableOpacity style={styles.button} onPress={()=>Login(formState)}>
        <Text style={{fontSize: 17, fontWeight: '600'}}>{loading ?<ActivityIndicator size={"small"}/>:"Continue"} </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 20,
    borderRadius: 7,
    backgroundColor: '#3F4E4F',
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor:"#000000"
  },
  forgotText: {
    alignSelf: 'flex-end',
    marginTop: 15,
  },
  button: {
    height: 50,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(93, 95, 222)',
    marginTop: 20,
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  signText: {},
});
