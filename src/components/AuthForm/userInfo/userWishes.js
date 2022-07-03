import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {style1} from '../allWishes/wishCss';
import moment from 'moment';
import GoBack from 'react-native-vector-icons/AntDesign';
import AwesomeAlert from 'react-native-awesome-alerts';

const UserWishes = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setData(
      !route.params.bucketInfo
        ? route.params.activeData
          ? route.params.activeData
          : route.params.nonActiveData
        : route.params.bucketInfo,
    );
  }, []);

  const showAlerts = () => {
    setShowAlert(true);
  };

  const hideAlerts = () => {
    setShowAlert(false);
  };

  const goToParentForm = () => {
    navigation.navigate('ParentForm');
  };

  return (
    <View style={{paddingHorizontal: 30}}>
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
        {data.map(e => {
          return (
            <TouchableOpacity
              style={style1.wishView}
              onPress={() => navigation.navigate('WishView')}>
              <View>
                <Text style={style1.wishText}>{e.wishName}</Text>
                <Text style={{fontSize: 10, marginTop: 5}}>
                  Pending{' '}
                  <Text style={{fontWeight: 'bold'}}>
                    {moment(e.createdAt).fromNow()}
                  </Text>
                </Text>
              </View>

              <View>
                {route.params.nonActiveData ? (
                  <TouchableOpacity
                    style={styles.plus}
                    onPress={() => showAlerts()}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 16,
                        marginTop: -2,
                      }}>
                      +
                    </Text>
                  </TouchableOpacity>
                ) : null}
                <Text
                  style={[
                    style1.activeOrNot,
                    {
                      backgroundColor: e.isActive ? '#3EC70B' : 'red',
                      alignSelf: 'center',
                    },
                  ]}></Text>
                <Text style={{marginTop: 1, fontWeight: '700'}}>
                  {e.isActive ? 'Active' : 'InActive'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Contribute"
        message="Contribute in someone's bucket"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, thank you !"
        confirmText="Yes, i want to contribute"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          hideAlerts();
        }}
        onConfirmPressed={() => {
          goToParentForm();
        }}
      />
    </View>
  );
};

export default UserWishes;

const styles = StyleSheet.create({
  goBack: {
    // borderWidth: 1,
    // borderColor: 'red',
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  plus: {
    position: 'absolute',
    bottom: 40,
    left: 35,
    borderWidth: 1,
    borderColor: '#3EC70B',
    height: 20,
    width: 40,
    borderTopRightRadius: 15,
  },
});
