import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const UserWishes = ({navigation, route}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(route.params.activeData);
  }, []);

  return (
    <View style={{paddingHorizontal: 30}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBack}></TouchableOpacity>

      <View>
        {data.map(e => {
          return <Text key={e._id}>{e.wishName}</Text>;
        })}
      </View>
    </View>
  );
};

export default UserWishes;

const styles = StyleSheet.create({
  goBack: {
    borderWidth: 1,
    borderColor: 'red',
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});
