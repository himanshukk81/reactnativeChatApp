import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,StatusBar,Image,TextInput,Button,KeyboardAvoidingView,ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'


export default class  Login  extends Component{
    state = {
        behavior: 'padding',
        modalOpen: false,
      };
    // signIn=()=>{
    //     Actions.Home()
    // }

    signIn()
    {
       // alert("Successfully login");
       Actions.Home()
    }
    fbLogin=()=>{
        alert("Sign In Success With FB");
    }
    googleLogin=()=>{
        alert("Sign In Success With Gmail");
    }
    render(){
        return(


                <View style={styles.container}>
                    <StatusBar backgroundColor="#002d38" barStyle="light-content" />                
                    
                        <View>             
                            <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Enter Mobile Number" placeholderTextColor="#ffffff" />
                            
                         
                            <TouchableOpacity  style={styles.button} onPress = {this.signIn}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </TouchableOpacity>    
                        </View>                         
                </View>   
        )
    }
}

const styles = StyleSheet.create ({
    
    container: {
       flex:1,
       flexDirection:'column',
       backgroundColor:'#546e7a',
       justifyContent: 'center',
       alignItems:'center'
    },

    inputBox:{
      width:300,
      backgroundColor:'#8d8d8d',
      borderRadius:25,
      paddingHorizontal:36,
      fontSize:16,
      color:'#ffffff',
      marginVertical:10  
    },
    button:{
      width:300,  
      backgroundColor:'#005662',
      borderRadius:25,
      marginVertical:10,
      paddingVertical:16, 
    },
    buttonText:{
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
    }

 })


 
