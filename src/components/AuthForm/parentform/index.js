import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GoBack from 'react-native-vector-icons/AntDesign';
import React from 'react';

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
});
