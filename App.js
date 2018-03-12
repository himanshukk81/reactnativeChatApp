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
// import SocketIOClient from 'socket.io-client';
// import io from 'socket.io-client/socket.io';
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
export default class App extends Component<Props> {
  
  constructor(props) {
    super(props);
    state = {
      messages: [],
      userId:null

    }
    // alert("Calling socket");
    // socket = SocketIOClient('https://reactnativechat.herokuapp.com');
    // socket.on('message',(message) => {
    //   console.log("Message data==="+message);
    //   alert("Hello ====="+message);
    // });
    // this.determineUser();
      

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

      socket.on('message', (messages) => {
        this.onReceivedMessage(messages)
      })
      // socket.on('message', this.onReceivedMessage);
      this.storeMessages = this.storeMessages.bind(this);
      // this._storeMessages = this._storeMessages.bind(this);
  }

  componentWillMount () {
    // // alert("Did amount calll=====");
    //  socket = io('https://reactnativechat.herokuapp.com', {
    //   transports: ['websocket']
    // })

    // socket.on('connect', () => {
    //   // alert("Socket connected");
    //   console.log("socket connected")
    //   // socket.emit('userJoined', {userId:1})
    //   // socket.on('userJoined', (r) => {
    //   //   // alert("User joined listen");
    //   //   console.log("User joined call===="+r);
    //   // })
    // })

    // socket.on('connect_error', (err) => {
    //   console.log("connection error==="+err);
    //   // alert("Connection error listen==="+err);
    // })

    // socket.on('disconnect', () => {
    //   // alert("Connection disconnect===");
    //   console.log("Disconnected Socket!")
    // })

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
    //  this.storeMessages(messages);

    // alert("OnReceived ccalll==="+JSON.stringify(messages));

    // alert("Message info==="+message);
    // var message={};
    // message._id=;
    // message.text=message1.text;
    // createdAt=new Date();
    // message.user={
    //           _id: ,
    //           name: 'React Native',
    //           avatar: 'https://facebook.github.io/react/img/logo_og.png'}    
    // // this.setState(previousState => ({
    // //   messages: GiftedChat.append(previousState.messages, messages),
    // // }))
    // // alert("Call=+++++++++++++++"+messageTest);

    // // this.storeMessages(messages);
    // // this.callFunction();
    // // this.storeMessages(messages);
    // alert("Message======="+JSON.stringify(message));
    console.log("On Message OnReceived======"+JSON.stringify(message));
    this.storeMessages(message);
  }

  onSend(messages = []) {

    socket.emit('message', messages[0]);
    
    this.storeMessages(messages);
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }))
  }




  


  render() {
    var user = { _id: this.state.userId || -1 };
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          user
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
