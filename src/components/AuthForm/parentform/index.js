import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GoBack from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';

const ParentForm = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBack}>
        <GoBack
          name="back"
          size={25}
          style={{alignSelf: 'center', marginTop: 10}}
        />
      </TouchableOpacity>

      <View>
        <TextInput placeholder="Name" style={styles.input} />
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput placeholder="Password" style={styles.input} />
        <TextInput placeholder="Contact" style={styles.input} />
      </View>
      <TouchableOpacity style={styles.father}>
        <Text style={{alignSelf: 'center'}}>Be a father</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ParentForm;

const styles = StyleSheet.create({
  goBack: {
    // borderWidth: 1,
    // borderColor: 'red',
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  input: {
    borderWidth: 1,
    borderBottomColor: 'red',
    paddingHorizontal: 20,
    marginTop: 30,
    borderRadius: 15,
  },
  father: {
    borderWidth: 1,
    borderColor: 'red',
    marginTop: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
});
