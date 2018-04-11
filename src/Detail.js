import React, { Component } from 'react'
import {Text, View, TouchableOpacity, StyleSheet,ActivityIndicator} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { SessionService } from './config/session-service';
const io = require('socket.io-client');
let socket;
let userInfo;
export default class Detail extends Component{

     constructor(props)
     {
        super(props);
        this.state = {
          messages: [],
          userId:SessionService.getUser().id,
          isLoadingEarlier:true,
          latestUserMessageId:0
        }
        userInfo={ _id:this.state.userId};
        socket=SessionService.getUserSockets();
     }
      componentDidMount() {    
            var userInfo={};
            userInfo.receiverId=this.props.navigation.state.params.receiverId;

            // alert("Receiver id==="+this.props.navigation.state.params.receiverId);
            userInfo.userId=SessionService.getUser().id;
            socket.emit('get_user_messages',userInfo);

            socket.on('chat_message', (messageInfo) => {

              

              if(messageInfo.messages.length==0)
              {
                this.setState({latestUserMessageId:messageInfo.latestId,isLoadingEarlier:false});
              }
              else
              {
                this.setState({latestUserMessageId:messageInfo.latestId});
              }
              this.onReceivedMessage(messageInfo.messages)
            })  
            
            socket.on('chat_message_send', (messageInfo) => {
              // console.log("Message Received====");
              // alert("Message reciecef=== receivered id==="+this.props.navigation.state.params.receiverId +"server=="+messages[0].user._id);

              // alert("Message info==="+JSON.stringify(messages)); 
              if(this.props.navigation.state.params.receiverId==messageInfo.senderId)
              {
                // alert("Condition match...");

                this.onReceivedMessage(messageInfo.messages)
              }
            })   

            


            socket.on('latest_user_message_id', (latestId) => {
              this.setState({latestUserMessageId:latestId});
            })  
            console.log("Messages===="+JSON.stringify(this.state.messages));
      }
      onReceivedMessage(messages){
        this.storeMessages(messages);
      }
      onSend(messages = []) {
        // console.log("Loading icon===="+this.state.isLoading);
        var messageInfo={};
        messageInfo.message=messages[0].text;
        messageInfo.receiverId=this.props.navigation.state.params.receiverId;
        messageInfo.createDate=new Date();
        messageInfo.senderId=this.state.userId;
        messageInfo.latestMessageId=this.state.latestUserMessageId;
        socket.emit('chat_message',messageInfo);
        this.storeMessages(messages);
      }
      storeMessages(messages){
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, messages),
            };
        });
        this.setState({isLoadingEarlier:false})
        // console.log("Loading icon for receiver===="+this.state.isLoading);
      }
      render() {

        if(this.state.isLoadingEarlier){
          return(
            <ActivityIndicator size="large" color="#0000ff" />
          )
        } 
      
        return (
          
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            renderLoading={() =>  <ActivityIndicator size="large" color="#0000ff" />}
            user={{
              userInfo
            }}
          />
        );
      }
}
