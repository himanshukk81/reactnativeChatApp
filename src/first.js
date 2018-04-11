import React, { Component } from 'react'
import { environment } from './config/environment';
import {SessionService} from './config/session-service';
import {AsyncStorage,Platform,Text } from 'react-native';
import FCM,{FCMEvent} from "react-native-fcm";
// import { platform } from 'os';
var fcmToken;
export default class First extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        if(SessionService.getUser())
        {
            SessionService.getUser().fcmToken=fcmToken;
            SessionService.setUser(SessionService.getUser());
            SessionService.setUserSockets();
            this.props.navigation.navigate('Home');
        }
        else
        {
            // this.props.navigation.navigate('Signin');
            // this.props.navigation.navigate('Home');

        }
    }
    componentDidMount()
    {
            //   var platform=Platform;
            //   console.log("Platform ==="+platform);
        
            //   alert("Platform ==="+platform);
            //   if(platform.ios)
               if(Platform.OS=='ios')  
              {
                  FCM.requestPermissions();
              }
              FCM.getFCMToken().then(token => {
                  console.log("token At first========"+token)
                  alert("token=="+token);
                  fcmToken=token;
                  SessionService.setFcmToken(fcmToken);
                  // store fcm token in your server
              });

             
            //   this.notificationUnsubscribe = FCM.on('notification', (notif) => {
            //       console.log("notifData==="+notif);
            //   });
            //   this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
            //       // alert("refreshToken=="+token)
            //       console.log("refresh token==="+token);
            //   });
                //   FCM.subscribeToTopic('/topics/foo-bar');
                //   FCM.unsubscribeFromTopic('/topics/foo-bar'); 
                //   SessionService.setUserSockets();   
                // if(SessionService.getUser())
                // {
                //   SessionService.setUserSockets();
                // }

      
    }

    render() {
        return ( 
            <Text>Helloooo</Text>    
        )
    }
}

