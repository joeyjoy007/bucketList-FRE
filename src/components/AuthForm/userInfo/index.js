import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {Storage} from '../../../storage/Storage';
import {fetchSingleUser} from '../../../server/apis/user';
import {fetchBucketForUser} from '../../../server/apis/bucket';
import MyActivityIndicator from './Activity';
import {RefreshBucket, RefreshState} from '../../../routes/Routes';
import {useFocusEffect} from '@react-navigation/native';

const UserInfo = ({navigation}) => {
  const [user, setUser] = useState();
  const [bucket, setBucket] = useState([]);
  const [activeBuckets, setActiveBuckets] = useState();
  const [nonActiveBuckets, setnonActiveBuckets] = useState();
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    const userInfo = await Storage.getItem('userInfo');
    // console.log(userId.user._id);
    // const i = await fetchSingleUser(userId.user._id);
    setUser(userInfo.user);
    // console.log('III=>   ', i.payload);
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchBucket();
  //   }),
  // );
  const {refreshState} = useContext(RefreshState);
  const {refreshBucket} = useContext(RefreshBucket);

  const fetchBucket = async () => {
    const userId = await Storage.getItem('userInfo');
    const bucketInfo = await fetchBucketForUser(userId.user._id);
    setBucket(bucketInfo.data.payload);

    const isActive = bucketInfo.data.payload.filter(
      elem => elem.isActive === true,
    );

    const isNonActive = bucketInfo.data.payload.filter(
      elem => elem.isActive === false,
    );
    setActiveBuckets(isActive);
    setnonActiveBuckets(isNonActive);
    // console.log(
    //   'BUCKETINFO =>  ',
    //   bucketInfo.data.payload.map(e => {
    //     return console.log(e.isActive);
    //   }),
    // );
  };

  useEffect(() => {
    fetchUser();
    fetchBucket();
  }, [refreshBucket, refreshState]);

  return (
    <>
      {!user && !bucket ? (
        <MyActivityIndicator />
      ) : (
        <View style={styles.mainView}>
          <View style={styles.userInfo}>
            <View>
              <Text style={styles.name}>{user ? user.name : '...'}</Text>

              <Text style={styles.name}>
                +91 {user ? user.phoneNumber : '...'}
              </Text>
            </View>
            <View>
              <Text style={styles.name}>Wishes</Text>
              <Text style={styles.name}>
                {user ? user.myWish.length : '...'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserWishes', {
                activeData: activeBuckets,
              })
            }
            style={[styles.active, {backgroundColor: '#38F8E5'}]}>
            <Text style={styles.activeWishes}>Active Wishes</Text>
            <Text style={styles.activeWishesNo}>
              {activeBuckets ? activeBuckets.length : 0}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserWishes', {
                nonActiveData: nonActiveBuckets,
              })
            }
            style={[styles.active, {backgroundColor: '#F38B8B'}]}>
            <Text style={styles.activeWishes}>Non-Active Wishes</Text>
            <Text style={styles.activeWishesNo}>
              {nonActiveBuckets ? nonActiveBuckets.length : 0}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.completeWish}
            onPress={() =>
              navigation.navigate('UserWishes', {
                bucketInfo: bucket,
              })
            }>
            <Text style={styles.activeWishes}>In Progress</Text>
            {/* <Text style={styles.activeWishesNo}>3</Text> */}
            <View style={styles.progressBar}>
              <View
                style={[styles.progress, {backgroundColor: '#F38B8B'}]}></View>
              <View
                style={[styles.progress, {backgroundColor: '#736400'}]}></View>
              <View
                style={[styles.progress, {backgroundColor: '#38F8E5'}]}></View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  mainView: {
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
    marginTop: 5,
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
    backgroundColor: '#F3CB8B',
  },
  progress: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 10,
  },
  progressBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
