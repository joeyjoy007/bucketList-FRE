import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {emailValidation} from '../../../helpers/helpers';
import {loginUser} from '../../../server/apis/user';
import {AuthContext} from '../../../context';
import {Storage} from '../../../storage/Storage';
import {createBucket} from '../../../server/apis/bucket';
import {RefreshState} from '../../../routes/Routes';

const CreateWish = ({navigation}) => {
  const [formState, setFormState] = useState({
    wishName: '',
    parent: '',
  });

  const {setRefreshState} = useContext(RefreshState);

  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);

  const {signIn} = useContext(AuthContext);

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
    const {wishName} = formState;

    if (!validObj(formState))
      return updateError('Fill all fields', setErrorText);

    // if (!emailValidation.test(email))
    //   return updateError('Write email correctly', setErrorText);

    // if (!password.trim || password.length < 6)
    //   return updateError(
    //     'Password must be of atleast 6 character',
    //     setErrorText,
    //   );

    return true;
  };

  const createBuckett = async data => {
    setLoading(true);
    const userId = await Storage.getItem('userInfo');
    try {
      createBucket({wishName: data.wishName, parent: userId.user._id});
      setRefreshState(true);
      setLoading(false);
      setFormState({wishName: ''});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.welcomeText}>Create yout Bucket</Text>
      <View>
        {errorText.length > 1 ? (
          <Text style={{color: 'red', fontSize: 17, marginTop: 20}}>
            {errorText}
          </Text>
        ) : null}
        <TextInput
          value={formState.wishName}
          onChangeText={wishName => setfields('wishName', wishName)}
          autoCapitalize="sentences"
          placeholder="Wish Name"
          style={styles.textStyle}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => createBuckett(formState)}>
        <Text style={{fontSize: 17, fontWeight: '600'}}>
          {loading ? <ActivityIndicator size={'small'} /> : 'Create Bucket'}{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateWish;

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
    backgroundColor: '#000000',
  },
  forgotText: {
    alignSelf: 'flex-end',
    marginTop: 15,
  },
  button: {
    height: 40,
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
