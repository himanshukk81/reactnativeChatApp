import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,StatusBar,ActivityIndicator,Image,TextInput,Button,KeyboardAvoidingView,ScrollView,AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { fbLoginPermissions } from './constants/index';
import { FBLoginManager } from 'react-native-facebook-login';
import { environment } from './config/environment';
// import {FCMEvent} from "react-native-fcm";
// import FCM from "react-native-fcm";

// import {FCMEvent} from 'react-native-fcm'
export default class  Login  extends Component{

    // let profileInfo;
    constructor(props) {
         
            super(props);
        
            this.state={
                name:null,
                mobile:null,
                createDate:new Date(),
                isLoading: false,
                userType:''
            }
            
            
    }    

    // componentDidMount() {
    //   // FCM.requestPermissions(); // for iOS
    //   FCM.getFCMToken().then(token => {
    //     console.log("token At first========"+token)
    //     alert("token=="+token);
    //     // store fcm token in your server
    //   });
    //   this.notificationUnsubscribe = FCM.on('notification', (notif) => {
    //     console.log("notifData==="+notif);
    //     // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    //   });
    //   this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
    //     alert("refreshToken=="+token)
    //     console.log("refresh token==="+token);
    //     // fcm token may not be available on first load, catch it here
    //   });

    //   FCM.subscribeToTopic('/topics/foo-bar');
    //   FCM.unsubscribeFromTopic('/topics/foo-bar');
    // }
    // componentWillUnmount() {
    //   // prevent leaking
    //   this.refreshUnsubscribe();
    //   this.notificationUnsubscribe();
    // }


    // async componentDidMount(){
    //   await FCM.requestPermissions();


    //   FCM.on('FCMTokenRefreshed', (token) => {

    //     alert("token==="+token);
    //     console.log('Does it work'+token)
    //   });
    //     // registerAppListener(this.props.navigation);
    //     // FCM.getInitialNotification().then(notif => {
    //     //   // this.setState({
    //     //   //   initNotif: notif
    //     //   // })
    //     //   console.log("Notify====>>>"+notif);
    //     //   if(notif && notif.targetScreen === 'detail'){
    //     //     setTimeout(()=>{
    //     //       this.props.navigation.navigate('Detail')
    //     //     }, 500)
    //     //   }
    //     // });

    //     // try{
    //     //   console.log("I am in try...");
    //     //   let result = await FCM.requestPermissions({badge: false, sound: true, alert: true});
    //     // } catch(e){

    //     //   console.error("i am in catch=="+e);
    //     // }

    //     // FCM.getFCMToken().then(token => {
    //     //   console.log("TOKEN (getFCMToken)", token);
    //     //   this.setState({token: token || ""})
    //     // });

    //     // if(Platform.OS === 'ios'){
    //     //   FCM.getAPNSToken().then(token => {
    //     //     console.log("APNS TOKEN (getFCMToken)", token);
    //     //   });
    //     // }
    //     // return new Promise(resolve => {
    //     //     FCM.getFCMToken().then(token => {
    //     //       console.log("TOKEN (getFCMToken)", token);
    //     //       // this.setState({token: token || ""})
    //     //       resolve(token);
    //     //     });
    //     // });

    //     FCM.getFCMToken().then(token => {
    //       console.log("Token recevied==="+token);
    //     }).catch(err =>{
    //         alert("Error==="+err);
    //         console.log("Error==="+err);
    //     });
    // }
 

   // componentDidMount() {
   //      this.state={
   //              name:null,
   //              mobile:null,
   //              createDate:new Date(),
   //              isLoading: false,
   //              userType:'',
   //              token:''
   //          }


   //          // FCM.requestPermissions();
   //          // FCM.getFCMToken().then(token => {
   //          //   console.log("TOKEN (getFCMToken)", token);
   //          //   alert("FCM Token:::==="+token);

   //          // });

   //            FCM.getToken().then(token => {
   //              console.log("user device token=="+token);
   //              alert("User Device Token==="+token);
   //            });

   //          this.refreshUnsubscribe = FCM.on("refreshToken", token => {
   //            console.log("TOKEN (refreshUnsubscribe)", token);
   //            alert("FCM Token 51 :::==="+token);
   //            // this.props.onChangeToken(token);
   //          });


   //          console.log("FCM:::=="+JSON.stringify(FCMEvent));
   //          // return new Promise((resolve, reject) => {

   //          //   FCM.on('refreshToken', (token) => {

   //          //      if(token)
   //          //      {
   //          //        resolve(token) 
   //          //      }
   //          //      else
   //          //      {
   //          //       alert("Error===");
   //          //      }
   //          //   }); 
   //          // })   
   //          // FCM.getFCMToken().then(token => {
   //          //       console.log("TOKEN (getFCMToken)", token);
   //          //       alert("token===="+token);
   //          //       this.setState({token: token || ""})
   //          //  }).catch(err=>{
   //          //       console.log("FCM Token error==="+err);
   //          //       alert("Fcm Token==="+err);
   //          //   });

   //            // var refreshTokenListener = FCM.on(FCMEvent.refreshToken, (token) => {
   //            // console.log('>>>> refreshTokenListener FCM token:', token);
   //            // }); 

   //          // if(Platform.OS === 'ios'){
   //          //   FCM.getAPNSToken().then(token => {
   //          //     console.log("APNS TOKEN (getFCMToken)", token);
   //          //   });
       



        
   //    }

    getLoginInfo()
    {
      return this.state;
    }  
    
  

    
    signIn=()=>
    {
       if(!this.state.mobile)
       {
         alert("Please Enter Mobile Number");
         return;
       }
      // AsyncStorage.setItem('userInfo', JSON.stringify(this.state),(err,result) =>{
      //   // alert("Set item=====");
      //   AsyncStorage.getItem("userInfo").then((value) => {
      //       // this.setState({"phoneNumber": value});
      //       var value = await AsyncStorage.getItem("userInfo");
      //       console.log("User infoo=="+value);
      //   })
      //   .then(res => {
      //       //do something else
      //       console.log("result=="+res);
      //   });



      // });

       this.saveInfoInDB();

       // console.log("set state=="+this.state);
       
    }





    fbLogin=()=>
    {
      FBLoginManager.loginWithPermissions(fbLoginPermissions || ['email'], (error, data) => {
        if (!error) {
          this.fbData(data.credentials.token)
        } else {
          alert("Failed to get info from facebook please try again");
          console.log("Firebase error==="+error);
          // reject(error);
        }
      });
    }

    fbData(token)
    {
       fetch('https://graph.facebook.com/v2.8/me?fields=id,first_name,last_name,gender,birthday,picture&access_token=' + token)
          .then((response) => response.json())
          .then((json) => {
            // alert("Facebook Data==="+json);

            console.log("Data===="+json);

            alert("Data==="+json);
            this.setState({name:json.first_name,userType:"F"})
            this.saveInfoInDB();
          })
          .catch(function(err) {

              // console.log("error==="+err);
          });
    }

    saveInfoInDB()
    {
       // console.log("State info==="+JSON.stringify(this.setState));
       this.setState({isLoading:true})
                var object = {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(this.state)
                };
              
               
               // var prod="https://reactnativechat.herokuapp.com/api/v1/app/";
               // var local="http://192.168.43.152:3001/api/v1/app/";
                 fetch(environment.API_URL.liveUrl+'user/verifyUser',object)
                .then((response) => response.json())
                .then((responseJson) => {
                    
                    // alert("User infos::=="+JSON.stringify(responseJson));
                    // console.log("logged in user========"+JSON.stringify(responseJson));
                    // AsyncStorage.setItem('userInfo', JSON.stringify(responseJson[0]));

                    // Actions.Users()


                    Actions.Users({item:responseJson[0]})

                    this.setState({isLoading:false})
                     // Actions.Users()
                    
                })
                .catch((error)=> {
                    this.setState({isLoading:false})
                    console.error("Error in sign up::=="+error);
                    alert("Something Went Wrong Please Try Again");
                });
    }

    googleLogin=()=>{
        alert("Sign In Success With Gmail");
    }

    handleMobileNo =(text) =>{
        this.setState({mobile:text,userType:'M'});
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

                            <TouchableOpacity  style={styles.fbButton} onPress = {()=>this.fbLogin()}>
                                        <Text style={styles.fbButtonText}>Sign In With Facebook</Text>
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
    },

    fbButton:{
      width:300,  
      backgroundColor:'#3b5998',
      borderRadius:25,
      marginVertical:10,
      paddingVertical:16, 
    },
    fbButtonText:{
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
    }



 })