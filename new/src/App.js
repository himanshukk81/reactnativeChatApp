/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
const io = require('socket.io-client');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'dsdddd',
});



type Props = {};
let socket;
let messageTest="this is test message now";
let userInfo;

export default class App extends Component<Props> {
  
  constructor(props) {
    super(props);
    state = {
      messages: [],
      userId:this.makeid()
    }
    userInfo={ _id:state.userId};

      socket = io('https://reactnativechat.herokuapp.com', {
        transports: ['websocket']
      })

      socket.on('connect', () => {
        // alert("Socket connected");
        console.log("socket connected")
        // socket.emit('userJoined', {userId:1})
        // socket.on('userJoined', (r) => {
        //   // alert("User joined listen");
        //   console.log("User joined call===="+r);
        // })
      })

      socket.on('connect_error', (err) => {
        console.log("connection error==="+err);
        // alert("Connection error listen==="+err);
      })

      socket.on('disconnect', () => {
        // alert("Connection disconnect===");
        console.log("Disconnected Socket!")
      })

      var data={userId:12}

      socket.emit('join',data);

      socket.on('message', (messages) => {
        this.onReceivedMessage(messages)
      })

      socket.on("chat_message",(data) => {
        alert("Message received successfuly==="+JSON.stringify(data));
        // this.onReceivedMessage(data) 
      })
      // socket.on('message', this.onReceivedMessage);
      this.storeMessages = this.storeMessages.bind(this);
      // this._storeMessages = this._storeMessages.bind(this);
  }



  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    // var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
  }

  componentWillMount () {
      this.setState({
        messages: [
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
          },
        ],
      })
  }


  
  onReceivedMessage(message) {
    alert("received message====");
    console.log("On Message OnReceived======"+JSON.stringify(message));
    // this.storeMessages(message);
  }

  onSend(messages = []) {
    
    // alert("Message infos=="+JSON.stringify(messages));  
    var messageInfo={};
    messageInfo.message=messages[0].text;
    // messageInfo.receiverId=messages[0].user.userInfo._id;
    messageInfo.receiverId=12;
    // alert("messages info====="+JSON.stringify(messageInfo));
    socket.emit('chat_message',messageInfo);
    this.storeMessages(messages);
  }

  render() {
    // alert("user 3==="+this.user3);
    // alert("user info==="+JSON.stringify(user));
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          userInfo
        }}
      />
    );
  }


  storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
        };
    });
    console.log("messagess180===="+JSON.stringify(this.state.messages));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',   // Horizontally and vertically align the the items.
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
