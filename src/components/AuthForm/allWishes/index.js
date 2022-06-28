import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { style1 } from './wishCss'

const AllWishes = ({navigation}) => {

    const list = [1,2,3,4,5,6,7,8,9]

    const renderItem = ({item})=>{
   
        return <TouchableOpacity style={style1.wishView} onPress={()=>navigation.navigate("WishView")} >
          <Text style={style1.wishText}>fly in fog {item}</Text>
          <View>
          <Text style={[style1.activeOrNot,{backgroundColor:"#3EC70B",alignSelf:"center"}]}></Text>
          <Text style={{marginTop:1,fontWeight:"700"}}>Active</Text>
          </View>
      </TouchableOpacity>
    }

  return (
      
    <View style={style1.mainView}>
      {/* <Text>AllWishes</Text> */}
      {/* {list.map((l)=>{
          return (
            <View style={style1.wishView}>
            <Text>Fly in fog</Text>
        </View>
          )
      })} */}
      <FlatList
      data={list}
      renderItem={renderItem}
      keyExtractor={item=>item}
      showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default AllWishes

const styles = StyleSheet.create({})