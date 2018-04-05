import React, { Component } from 'react'
import {Modal,Text, View, TouchableOpacity, StyleSheet,ActivityIndicator,TouchableHighlight,Button,TextInput} from 'react-native'
import { Actions } from 'react-native-router-flux'
// import {Modal, Text, TouchableHighlight, View,ScrollView,ActivityIndicator,StyleSheet,TouchableOpacity,TextInput,Button} from 'react-native';
import { Container, Content, Item, List, Body, ListItem ,CheckBox,Icon} from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat'
import {SessionService} from './config/session-service';
let socket;
let userInfo;
var addGroup;
export default class GroupDetail extends Component{
     constructor(props)
    {
      // SessionService.getUser().id
      // this.props.navigation.state.params.groupId

        // SessionService.getUser().id 
        // SessionService.getGroupInfo().groupId

        
        super(props);
        this.state = {
          messages: [],
          userId:1837576,
          isLoading:true,
          groupId:48
        }
         userInfo={ _id:this.state.userId};
         addGroup=this;


          
         
      //  alert("props info==="+JSON.stringify(props));  
    }

    
      componentDidMount() {  
            socket=SessionService.getUserSockets();
            var groupInfo={};
            groupInfo.userId=this.state.userId;
            groupInfo.groupId=this.state.groupId;
            // http://192.168.0.142   home network
           // var localUrl="http://192.168.43.152"  office network tripleplay

            // var localUrl="192.168.1.44:3001" //TechCraftz network
            // var liveUrl="https://reactnativechat.herokuapp.com";
            // socket = io(liveUrl, {
            //   transports: ['websocket']
            // })
            // socket.on('connect', () => {
            //   console.log("socket connected")             
            // })
            
            // socket.emit('userJoined',groupInfo);

            // socket.on('connect_error', (err) => {
            //   console.log("connection error==="+err);
            // })

            // socket.on('disconnect', () => {
            //   console.log("Disconnected Socket!")
            // })

            socket.on('group_chat_message', (messages) => {
              // console.log("Message Received====");
              // // alert("Messages info==="+JSON.stringify(messages));
              // console.log("Message info===="+JSON.stringify(messages));
              // if(messages[0].user._id==SessionService.getGroupInfo().groupId)
              // {
              //   this.onReceivedMessage(messages)
              // }
              console.log("Messages info==="+JSON.stringify(messages));
              this.onReceivedMessage(messages)
            }) 
            
            socket.on('group_chat_message_send', (messages) => {

              // console.log("Messages info==="+JSON.stringify(messages));
              console.log("Group info messags==="+JSON.stringify(SessionService.getGroupInfo()));
              if(messages[0].user._id==SessionService.getGroupInfo().groupId)
              {
                this.onReceivedMessage(messages)
              }
            })  

            

            socket.emit('get_group_messages',groupInfo);
            
            
      } 
      onReceivedMessage(messages){

        this.storeMessages(messages);
      }
      onSend(messages = []) {
        // var userInfo=SessionService.getUser();
        this.setState({isLoading:true})
        console.log("Loading icon===="+this.state.isLoading);
        var messageInfo={};
        messageInfo.message=messages[0].text;
        messageInfo.messageDate=new Date();
        messageInfo.senderId=this.state.userId;
        // messageInfo.members=this.props.navigation.state.params.member;
        // messageInfo.groupId=this.props.navigation.state.params.groupId;
        // messageInfo.senderName=this.props.navigation.state.params.senderName;
        // messageInfo.members=SessionService.getGroupInfo().member;
        // messageInfo.groupId=SessionService.getGroupInfo().groupId;
        // messageInfo.senderName=SessionService.getGroupInfo().senderName;


         messageInfo.members="1837575";
         messageInfo.groupId=this.state.groupId;
         messageInfo.senderName="Himanshu";
        
        socket.emit('group_chat_message',messageInfo);
        this.storeMessages(messages);
      }
      storeMessages(messages){
        this.setState((previousState) => {
          return {
            // messages: GiftedChat.append(previousState.messages, messages),
            messages:GiftedChat.append(previousState.messages, messages),
            };
        });
        this.setState({isLoading:false})
        console.log("Loading icon for receiver===="+this.state.isLoading);
      }

      setModalVisible(visible) {
        this.setState({modalVisible: visible});
        if(!visible)
        {
          this.setState({isLoading:true});
          // this.getGroupsList();
        }
      }



      static navigationOptions = {
        headerRight: (
        <Button onPress={() => addGroup.openModal()}
          title="Add Member"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"/>   
        )}

      openModal()
      {
        // alert("Open modal---");
        var groupInfo={};
        // groupInfo.groupId=this.props.navigation.state.params.groupId;
        // groupInfo.members=this.props.navigation.state.params.member;
        // groupInfo.name=this.props.navigation.state.params.name;

        groupInfo.groupId=SessionService.getGroupInfo().groupId;
        groupInfo.members=SessionService.getGroupInfo().member;
        groupInfo.name=SessionService.getGroupInfo().name;
        this.props.navigation.navigate('AddMemberPage',groupInfo);
      }
      // static navigationOptions = {
      //   headerRight: (
      //   <Button onPress={() => {
      //     this.openModal()
      //   }}
      //     title="Add Member"
      //     color="#841584"/>   
      //   )}
      render() {
        renderMessageText2 =()=>{
          return "himanshu"
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
