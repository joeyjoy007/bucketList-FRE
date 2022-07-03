import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const UserInfo = () => {
  return (
    <View style={styles.mainView}>
      <View style={styles.userInfo}>
        <View>
          <Text style={styles.name}>Garvit Jain</Text>
          <Text style={styles.name}>Age 21</Text>
        </View>
        <View>
          <Text style={styles.name}>Wishes</Text>
          <Text style={styles.name}>2</Text>
        </View>
      </View>

      <View style={styles.active}>
        <Text style={styles.activeWishes}>Active Wishes</Text>
        <Text style={styles.activeWishesNo}>2</Text>
      </View>
      <View style={styles.active}>
        <Text style={styles.activeWishes}>Non-Active Wishes</Text>
        <Text style={styles.activeWishesNo}>4</Text>
      </View>

      <View style={styles.completeWish}>
        <Text style={styles.activeWishes}>Completed Wish</Text>
        <Text style={styles.activeWishesNo}>3</Text>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  mainView: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  userInfo: {
    borderWidth: 1,
    borderColor: 'grey',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
  },
  active: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingVertical: 60,
    marginTop: 40,
    borderRadius: 10,
  },
  activeWishes: {
    alignSelf: 'center',
    fontSize: 18,
    borderRadius: 10,
  },
  activeWishesNo: {
    alignSelf: 'center',
    fontSize: 18,
    marginTop: 10,
  },
  completeWish: {
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 40,
    paddingVertical: 30,
    borderRadius: 10,
  },
});
