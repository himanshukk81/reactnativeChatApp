import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator, Image, TextInput, Button, KeyboardAvoidingView, ScrollView, AsyncStorage,BackHandler } from 'react-native'
import { fbLoginPermissions } from './constants/index';
// import { FBLoginManager } from 'react-native-facebook-login';
import { environment } from './config/environment';
import { Container, Header, Content, Icon } from 'native-base';
import {SessionService} from './config/session-service';
import { GiftedChat ,Bubble} from 'react-native-gifted-chat'

// var sessionData;

var flag=false;
var senderCounter=0;
export default class Login extends Component {
    // state = {
    //     messages: [],
    //   }
    constructor(props) {

        super(props);
        // this.state = {
        //     name: null,
        //     mobile: null,
        //     createDate: new Date(),
        //     isLoading: false,
        //     userType: ''
        // }

        this.state = {name:"hello",messages: [],isLoading:true};

   
        

    }

    
    componentDidMount() {
        // this.state = {
        //     name: null,
        //     mobile: null,
        //     createDate: new Date(),
        //     isLoading: false,
        //     userType: "",
        //     fcmToken:""
        // }

        this.setState({
            messages: [
              {
                _id: 1,
                senderName:"Himanshu",
                text: 'Hello developer',
                sender:true,
                createdAt: new Date(),
                user: {
                  _id: 2
                  //   avatar: 'https://www.limestone.edu/sites/default/files/user.png',
                },
              },
              {
                _id: 2,
                senderName:"Shahid",
                text: 'Hello User',
                sender:false,
                createdAt: new Date(),
                user: {
                  _id: 2
                  //   avatar: 'https://www.limestone.edu/sites/default/files/user.png',
                },
              },
            ],
            isLoading:false,
          })

          

        // var userInfo={};
        // userInfo.id=this.makeid(4);
        // SessionService.setUser(userInfo);
    }

    makeid(num) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        // var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        // var possible="123456789";
        for (var i = 0; i <num; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    componentWillMount()
    {
        BackHandler.addEventListener('hardwareBackPress', () => {
            // const { dispatch, nav } = this.props;
            // alert("Press back button");
            // dispatch({ type: 'Navigation/BACK' })
            // this.props.navigation.navigate('Home');
            return true
        })
    }

    getLoginInfo() {
        return this.state;
    }




    signIn = () => {
        // if (!this.state.mobile) {
        //     alert("Please Enter Mobile Number");
        //     return;
        // }
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
        this.setState({ isLoading: true })
        // this.props.navigation.navigate('Home');
        this.saveInfoInDB();
        
        // console.log("set state=="+this.state);
        // alert("data==="+this.state.userType);
    }





    // fbLogin = () => {
    //     FBLoginManager.loginWithPermissions(fbLoginPermissions || ['email'], (error, data) => {
    //         if (!error) {
    //             this.fbData(data.credentials.token)
    //         } else {
    //             alert("Failed to get info from facebook please try again");
    //             console.log("Firebase error===" + error);
    //             // reject(error);
    //         }
    //     });
    // }

    fbData(token) {
        fetch('https://graph.facebook.com/v2.8/me?fields=id,first_name,last_name,gender,birthday,picture&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                // alert("Facebook Data==="+json);

                console.log("Data====" + json);

                // alert("Data===" + json);
                this.setState({ name: json.first_name, userType: "F" })
                this.saveInfoInDB();
            })
            .catch(function (err) {

                // console.log("error==="+err);
            });
    }

    saveInfoInDB() {
        // console.log("State info==="+JSON.stringify(this.setState));
        this.setState({ fcmToken:"123"})
        var object = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        };


        // var prod="https://reactnativechat.herokuapp.com/api/v1/app/";
        // var local="http://192.168.43.152:3001/api/v1/app/";

        // alert("url:="+environment.API_URL.liveUrl);
        fetch(environment.API_URL + 'user/verifyUser', object)
            .then((response) => response.json())
            .then((responseJson) => {

                // alert("User infos::=="+JSON.stringify(responseJson));
                // console.log("logged in user========"+JSON.stringify(responseJson));
                // AsyncStorage.setItem('userInfo', JSON.stringify(responseJson[0]));

                // Actions.Users()


                // Actions.Users({ item: responseJson[0] })
                // responseJson[0].fcmToken=SessionService.fcmToken();
                SessionService.setUser(responseJson[0]);
                this.props.navigation.navigate('Home', responseJson[0]);
                // SessionService.setUserInfo(responseJson[0]);
                // sessionData.setUserInfo(responseJson[0]);
                this.setState({ isLoading: false })

                // Actions.Users()

            })
            .catch((error) => {
                this.setState({ isLoading: false })
                console.error("Error in sign up::==" + error);
                alert("Something Went Wrong Please Try Again===="+error);
            });
    }

    googleLogin = () => {
        alert("Sign In Success With Gmail");
    }

    handleMobileNo = (text) => {
        this.setState({ mobile: text, userType: 'M' });
    }


    


       customMessage()
       {
           return "Hi......"
       } 

       renderFooter(props) {
        return (
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>
                Hellooo
              </Text>
            </View>
          );
      }
      renderMessageText(props)
      {
        return (
           <View> 
            <Text>This is me</Text>
           </View> 
          ); 
      }
    //   renderBubble(props) {
    //     return (
    //       <Bubble
    //         {...props}
    //         wrapperStyle={{
    //           left: {
    //             backgroundColor: '#f0f0f0',
    //           }
    //         }}
    //       />
    //     );
    //   }

    renderBubble(props) {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: '#f0f0f0',
              }
            }}
          />
        );
    }

    renderMessageText(props)
    {
        return (
            <View style={{flex:1,flexDirection:'row'}}> 
             <View style={{flex:0.5}}> 
                <Text>This is me</Text>
             </View> 
            </View> 
           );   
    }
    
  

       onSend(messages = []) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, messages),
          };
        });
      }
    //   renderCustomView(props){

    //     //    alert("props==="+JSON.stringify(props)) 

    //     // alert("counter==="+this.state.senderCounter);

    //     if(flag)
    //     {
    //         senderCounter++;
    //     }
    //     flag=true;
    //       return(
    //        <View> 
    //             {
    //                 <Text>{props.messages[senderCounter].sender ? null: props.messages[senderCounter].senderName}</Text>  
    //             }  
    //        </View> 
    //       ) 
         
    //   }
    render() {

        return(
            <View style={styles.container}>
                            <StatusBar backgroundColor="#002d38" barStyle="light-content" />

                                <View>                    
                                    <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Enter Mobile Number" placeholderTextColor="#ffffff" onChangeText={this.handleMobileNo} />
                                
                                    <TouchableOpacity style={styles.button} onPress={() => this.signIn()}>
                                        <Text style={styles.buttonText}>Proceed</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.fbButton} onPress={() => this.fbLogin()}>
                                        <Text style={styles.fbButtonText}>Sign In With Facebook</Text>
                                    </TouchableOpacity>

                                    {this.state.isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}

                                    
                                </View>
            </View>
        )     
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#546e7a',
        justifyContent: 'center',
        alignItems: 'center'
    },




    inputBox: {
        width: 300,
        backgroundColor: '#8d8d8d',
        borderRadius: 25,
        paddingHorizontal: 36,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#005662',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },

    fbButton: {
        width: 300,
        backgroundColor: '#3b5998',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
    },
    fbButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },

    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
      },
      footerText: {
        fontSize: 14,
        color: '#aaa',
      },
})