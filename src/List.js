import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
// const goDetail = () => {
//     Actions.Detail()
//  } 


// const List = () => {
//     const goToAbout = () => {
//     alert("hello")
//        Actions.Detail()
//     }
//     return (
//        <TouchableOpacity style = {{ margin: 128 }} onPress = {goToAbout}>
//           <Text>This is HOME!</Text>
//        </TouchableOpacity>
//     )
//  }
//  export default List
 
class List extends Component {
   state = {
      names: [
         {
            id: 0,
            name: 'Ben',
         },
         {
            id: 1,
            name: 'Susan',
         },
         {
            id: 2,
            name: 'Robert',
         },
         {
            id: 3,
            name: 'Mary',
         },
      ]
   }
   

   
   alertItemName = (item) => {
      alert(item.name)
   }
goDetail1=(item)=>{
    console.log("Item nme=="+item.name);
    Actions.Detail({text :item.name})
}
 
   
   render() {
    console.log("state=="+JSON.stringify(this.state));
      return (
         <View> 
            {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress = {()=>this.goDetail1(item)}>
                     
                     <Text style = {styles.text}>
                        {item.name}
                     </Text>
                  </TouchableOpacity>
               ))
            }
         </View>
      )
   }
}
export default List

const styles = StyleSheet.create ({
   container: {
      padding: 10,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   text: {
      color: '#4f603c'
   }
})