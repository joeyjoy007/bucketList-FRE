import { StyleSheet } from "react-native";

export const style1 = StyleSheet.create({
mainView:{
    paddingHorizontal:30,
    paddingVertical:5
},
wishView:{
    paddingVertical:20,
    marginTop:35,
    borderWidth:1,
    borderColor:"#caf0f8",
    borderRadius:15,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    backgroundColor:"#caf0f8",
    elevation: 2,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    paddingLeft:15,
    paddingRight:25
},
wishText:{
    fontSize:17,
    fontWeight:"700"
},
activeOrNot:{
    height:15,
    width:15,
    borderRadius:7.5
}
})