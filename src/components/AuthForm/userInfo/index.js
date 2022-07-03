import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Storage} from '../../../storage/Storage';
import {fetchSingleUser} from '../../../server/apis/user';
import {fetchBucketForUser} from '../../../server/apis/bucket';
import MyActivityIndicator from './Activity';

const UserInfo = ({navigation}) => {
  const [user, setUser] = useState();
  const [bucket, setBucket] = useState([]);
  const [activeBuckets, setActiveBuckets] = useState();
  const [nonActiveBuckets, setnonActiveBuckets] = useState();
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    const userId = await Storage.getItem('userInfo');
    console.log(userId.user._id);
    const i = await fetchSingleUser(userId.user._id);
    setUser(i.payload);
    // console.log('III=>   ', i.payload);
  };

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
  }, []);

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
                {user ? user.myWish.length - 1 : '...'}
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
            onPress={() => navigation.navigate('UserWishes')}
            style={[styles.active, {backgroundColor: '#F38B8B'}]}>
            <Text style={styles.activeWishes}>Non-Active Wishes</Text>
            <Text style={styles.activeWishesNo}>
              {nonActiveBuckets ? nonActiveBuckets.length : 0}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.completeWish}>
            <Text style={styles.activeWishes}>Completed Wish</Text>
            <Text style={styles.activeWishesNo}>3</Text>
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
});
