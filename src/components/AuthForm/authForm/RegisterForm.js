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
import { createUser } from '../../../server/apis/user';

const RegisterForm = ({navigation}) => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    type: '',
  });
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false)

  const setfields = (key, value) => {
    setFormState({...formState, [key]: value});
  };

  const updateError = (error, setErrorText) => {
    setErrorText(error);
    setTimeout(() => {
      setErrorText('');
    }, 2000);
  };

  const validObj = obj => {
    return Object.values(obj).every(value => value.trim());
  };

  const validateFields = () => {
    const {email, password , name, phoneNumber,type} = formState;

    if (!validObj(formState))
      return updateError('Fill all fields', setErrorText);

    if (!emailValidation.test(email))
      return updateError('Write email correctly', setErrorText);

    if (!name.trim() || name.length < 6)
      return updateError('Name must be atleast 6 characters', setErrorText);

    if (!phoneNumber.trim() || phoneNumber.length < 10)
      return updateError('Phone number must be of 10 numbers', setErrorText);

    if (!type.trim() || type.length < 5)
      return updateError('Type should be mentioned', setErrorText);

    if (!password.trim || password.length < 6)
      return updateError(
        'Password must be of atleast 6 character',
        setErrorText,
      );

    return true;
  };

  const RegisterForm = async (data)=>{
    setLoading(true)
    if(validateFields()){
      try {
      setLoading(true)
      const response = await createUser(data)
      if(response.status === 1){
      setLoading(false)
        navigation.navigate("Login")
      }
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    else{
      // alert("FAILED")
      
    }

  }

  return (
    <View style={styles.mainView}>
      <Text style={styles.welcomeText}>Register here !</Text>
      <View>
      {errorText.length>1 ? <Text style={{color:"red",fontSize:17,marginTop:20}}>{errorText}</Text>:null}
        <TextInput
          placeholder="Name"
          value={formState.name}
          onChangeText={name => setfields('name', name)}
          style={styles.textStyle}
        />

        <TextInput
          placeholder="Email"
          value={formState.email}
          onChangeText={email => setfields('email', email)}
          keyboardType="email-address"
          style={styles.textStyle}
        />

        <TextInput
          placeholder="Password"
          value={formState.password}
          onChangeText={password => setfields('password', password)}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textStyle}
        />

        <TextInput
          placeholder="Phone number"
          value={formState.phoneNumber}
          onChangeText={phoneNumber => setfields('phoneNumber', phoneNumber)}
          keyboardType="number-pad"
          style={styles.textStyle}
        />

        <TextInput
          placeholder="Type"
          value={formState.type}
          autoCapitalize="none"
          onChangeText={type => setfields('type',type)}
          autoCorrect={false}
          style={styles.textStyle}
        />
      </View>
      <Text style={styles.forgotText}>Forgot password?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => RegisterForm(formState)}>
        
        <Text style={{fontSize: 17, fontWeight: '600'}}> {loading ? <ActivityIndicator size="small"/>:"Continue"} </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;

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
RegisterForm;
