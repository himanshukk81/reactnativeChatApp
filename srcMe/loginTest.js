import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,StatusBar,Image,TextInput,Button,KeyboardAvoidingView,ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'


export default class  Login  extends Component{
    state = {
        behavior: 'padding',
        modalOpen: false,
      };
    signIn=()=>{
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

            <ScrollView contentContainerStyle={styles.contentContainer}> 
                <View style={styles.container}>
                    <StatusBar backgroundColor="#002d38" barStyle="light-content" />                
                        <View style={[styles.boxContainer,styles.boxOne]} >  

                        </View> 

                    
                        <View style={[styles.boxContainer,styles.boxTwo]} > 
            
                            <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Enter Email" placeholderTextColor="#ffffff" />
                            <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Enter Password" placeholderTextColor="#ffffff" />
							                           
	                        <View style={[styles.boxContainer,styles.boxThree]} >  
	                            <TouchableOpacity  style={styles.fbButton} onPress = {()=>this.fbLogin()}>
	                                    <Text style={styles.fbButtonText}>Sign In With Facebook</Text>
	                            </TouchableOpacity> 
	                            <TouchableOpacity  style={styles.gmailButton} onPress = {()=>this.googleLogin()}>
	                                    <Text style={styles.gmailButtonText}>Sign In With Google</Text>
	                            </TouchableOpacity> 

	                            <Text style={styles.signUpTextContent}>Dont't Have an account yet? Signup </Text>
	                        </View> 
                            <TouchableOpacity  style={styles.button} onPress = {()=>this.signIn()}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </TouchableOpacity>    
                        </View> 

                        
                </View>   
            </ScrollView>    
        )
    }
}

const styles = StyleSheet.create ({
    contentContainer: {
        flex:1,
        paddingVertical: 20,
        backgroundColor:'#546e7a'
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
      },
    container: {
    //    backgroundColor: '#546e7a',
       flex:1,
    //    alignItems: 'top',
    //    justifyContent:'center',
       flexDirection:'column',
       backgroundColor:'#546e7a',
    //    backgroundColor:'#546e7a'
    },

    boxContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    boxOne:{
        // backgroundColor:'#546e7a'
    },
    boxTwo:{
        flex:1,
        // backgroundColor:'#546e7a',
        justifyContent:'space-around',

        
    },
    boxThree:{
        // backgroundColor:'#546e7a',
        justifyContent:'space-around',
        
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
    },
    fbButton:{
        width:300,  
        backgroundColor:'#2400ff',
        // borderRadius:25,
        marginVertical:10,
        paddingVertical:16,
    },
    gmailButton:{
        // backgroundColor:'#c4001d', 
        width:300,  
        backgroundColor:'#c4001d',
        // borderRadius:25,
        marginVertical:10,
        paddingVertical:16,
    },

    fbButtonText:{
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center' 
    },
    gmailButtonText:{
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
    },

    signUpTextContent:{
       justifyContent:'flex-end', 
       textAlign:'center' ,
       color:'#ffffff',
    }

   

 })


 
