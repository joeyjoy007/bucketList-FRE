import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {style1} from './wishCss';
import {fetchBucket} from '../../../server/apis/bucket';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import KK from 'react-native-vector-icons/Entypo';
import {AuthContext} from '../../../context';
import {RefreshState} from '../../../routes/Routes';

const AllWishes = ({navigation, route}) => {
  const [bucket, setBucket] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [allActive, setAllActive] = useState(false);
  const [allInactive, setAllInactive] = useState(false);

  const {refreshState} = useContext(RefreshState);

  useFocusEffect(
    React.useCallback(() => {
      allBucket();
      if (route.name === 'Active') {
        setAllActive(true);
        setAllInactive(false);
      } else if (route.name === 'Non-Active') {
        setAllActive(false);
        setAllInactive(true);
      }
    }),
  );

  const {signOut} = useContext(AuthContext);

  const allBucket = async () => {
    try {
      fetchBucket()
        .then(res => {
          // console.log('RESPOSNE =>   ', res.data.payload);
          setBucket(res.data.payload);
        })
        .catch(err => {
          console.log(err.message);
        });
      // if(response && response.payload && response.status === 1){
      // console.log("Response => ",response.payload)
      // setBucket(response.payload);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allBucket();
  }, [refreshState]);

  const activeFilter = arr => {
    const filter = arr.filter(elem => elem.isActive === true);
    return filter;
  };
  const inActiveFilter = arr => {
    const filter = arr.filter(elem => elem.isActive === false);
    return filter;
  };

  const Logout = () => {
    signOut();
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={style1.wishView}
        onPress={() => navigation.navigate('WishView')}>
        <View>
          <Text style={style1.wishText}>{item.wishName}</Text>
          <Text style={{fontSize: 10, marginTop: 5}}>
            Pending{' '}
            <Text style={{fontWeight: 'bold'}}>
              {moment(item.createdAt).fromNow()}
            </Text>
          </Text>
        </View>

        <View>
          <Text
            style={[
              style1.activeOrNot,
              {
                backgroundColor: item.isActive ? '#3EC70B' : 'red',
                alignSelf: 'center',
              },
            ]}></Text>
          <Text style={{marginTop: 1, fontWeight: '700'}}>
            {item.isActive ? 'Active' : 'InActive'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style1.mainView}>
      <FlatList
        data={allActive ? activeFilter(bucket) : inActiveFilter(bucket)}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        // showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity onPress={() => Logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AllWishes;

const styles = StyleSheet.create({});
