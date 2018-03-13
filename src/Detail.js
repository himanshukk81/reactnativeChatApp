import React, { Component } from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import { Actions } from 'react-native-router-flux'
class Detail extends Component {
// const Detail = () => {
// console.log("data===="+JSON.stringify(this.props));
//    const goToHome = () => {
//       Actions.List()
//    } 

//     return (
//         <TouchableOpacity style = {{ margin: 128 }} onPress = {goToHome}>
//            <Text>This is {this.props.name}</Text>
//         </TouchableOpacity>
    
//      )

     
   

// }
render() {
    console.log("data===="+JSON.stringify(this.props));
    return (
      <View style={{margin: 128}}>
        {/* <Text>This is PageTwo!</Text> */}
        <Text>Hi this is {this.props.text}</Text>
      </View>
    )
  }
} 
  
export default Detail