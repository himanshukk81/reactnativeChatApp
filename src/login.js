import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,StatusBar,ActivityIndicator,Image,TextInput,Button,KeyboardAvoidingView,ScrollView,AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux';

export default class  Login  extends Component{


    // state1 = {
    //     mobile: ''
    // } 
    
    constructor(props) {
         
            super(props);
        
            this.state={
                mobile:'',
                isLoading: false
            }
            
            
    }    


    componentDidMount() {
       
        
      }
    
  

    
    signIn=()=>
    {
            this.setState({isLoading:true})
                var object = {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(this.state)
                };
               if(!this.state.mobile)
               {
                 alert("Please Enter Mobile Number");
                 return;
               }
               
               fetch('https://reactnativechat.herokuapp.com/api/v1/app/user/verifyUser',object)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({isLoading:false})
                    // alert("User infos::=="+JSON.stringify(responseJson));
                    // console.log("logged in user========"+JSON.stringify(responseJson));
                    AsyncStorage.setItem('userInfo', JSON.stringify(responseJson[0]), () =>{
                        AsyncStorage.getItem('userInfo', (err, result) =>{
                            // obj1.userId=result.id;
                            // alert("Objec infos 65=="+result);
                            // this.getUsersList()
                        });  
                    });
                    Actions.Users()
                })
                .catch((error)=> {
                    this.setState({isLoading:false})
                    console.error("Error in sign up::=="+error);
                    alert("Something Went Wrong Please Try Again");
                });
    }


    fbLogin=()=>{
        alert("Sign In Success With FB");
    }
    googleLogin=()=>{
        alert("Sign In Success With Gmail");
    }

    handleMobileNo =(text) =>{
        this.setState({mobile:text});
    }
    render(){


        return(


                <View style={styles.container}>
                    <StatusBar backgroundColor="#002d38" barStyle="light-content" />                
                    
                        <View>             
                            <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Enter Mobile Number" placeholderTextColor="#ffffff" onChangeText = {this.handleMobileNo} />
                            
                         
                            <TouchableOpacity  style={styles.button} onPress = {()=>this.signIn()}> 
                                <Text style={styles.buttonText}>Proceed</Text>  

                                        
                            </TouchableOpacity>    
                            {this.state.isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                            
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


 
