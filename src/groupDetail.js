import React, { Component } from 'react'
import {Modal,Text, View, TouchableOpacity, StyleSheet,ActivityIndicator,TouchableHighlight,Button,TextInput,BackHandler} from 'react-native'
// import {Modal, Text, TouchableHighlight, View,ScrollView,ActivityIndicator,StyleSheet,TouchableOpacity,TextInput,Button} from 'react-native';
import { Container, Content, Item, List, Body, ListItem ,CheckBox,Icon} from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat'
import {SessionService} from './config/session-service';
let socket;
let userInfo;
var addGroup;
var flag;
var senderCounter=0;
var activeMessage=false;
var latestMessages;
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
          userId:SessionService.getUser().id,
          isLoading:true,
          groupId:SessionService.getGroupInfo().groupId,
          isLoadingEarlier:true,
          latestMessageId:0
        }
         userInfo={ _id:this.state.userId};
         addGroup=this;


          
         
      //  alert("props info==="+JSON.stringify(props));  
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
      componentDidMount() {  
            socket=SessionService.getUserSockets();
            var groupInfo={};
            groupInfo.userId=this.state.userId;
            groupInfo.groupId=this.state.groupId;
            // http://192.168.0.142   home network
          //  var localUrl="http://192.168.43.152"  office network tripleplay

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

            socket.on('group_chat_message', (messageInfo) => {
              // console.log("Message Received====");
              // // alert("Messages info==="+JSON.stringify(messages));
              // console.log("Message info===="+JSON.stringify(messages));
              // if(messages[0].user._id==SessionService.getGroupInfo().groupId)
              // {
              //   this.onReceivedMessage(messages)
              // }
              console.log("Messages info==="+JSON.stringify(messageInfo));
              this.setState({latestMessageId:messageInfo.latestId})
              this.onReceivedMessage(messageInfo.messages)
            }) 

            socket.on('latest_group_message_id',(groupMessageId)=>{
              // alert("Latest group message id==="+groupMessageId);
              this.setState({latestMessageId:groupMessageId})
            })
            
            socket.on('group_chat_message_send', (messages) => {

              // console.log("Messages info==="+JSON.stringify(messages));
              console.log("Group info messags==="+JSON.stringify(SessionService.getGroupInfo()));
              if(messages[0].user._id==SessionService.getGroupInfo().groupId )
              {
                latestMessages=messages;
                this.onReceivedMessage(messages)

              }
              activeMessage=true;
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
         messageInfo.members=SessionService.getGroupInfo().member;
         messageInfo.groupId=this.state.groupId;
         messageInfo.senderName=SessionService.getUser().mobile;
         messageInfo.latestMessageId=this.state.latestMessageId;
         messageInfo.sender=true;
        socket.emit('group_chat_message',messageInfo);
        this.storeMessages(messages);
      }
      storeMessages(messages){

        // alert("messages info==="+messages)
        this.setState((previousState) => {
          return {
            // messages: GiftedChat.append(previousState.messages, messages),
            messages:GiftedChat.append(previousState.messages, messages),
            };
        });
        this.setState({isLoadingEarlier:false})
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

      renderCustomView(props){
        var senderInfo={};
        if(!activeMessage)
        {
          if(flag)
          {
              senderCounter++;
          }
          senderInfo=props.messages[senderCounter];
        }
        else
        {
          senderInfo=latestMessages[0];
          // alert("last  data==="+JSON.stringify(senderInfo));
          
        }
        
        // <Text>{props.messages[senderCounter].sender ? null: props.messages[senderCounter].senderName}</Text>  

        flag=true;
          return(
           <View> 
                {
                    <Text>{senderInfo.sender ? null: senderInfo.senderName}</Text>  
                }  
           </View> 
          ) 
         
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
              renderCustomView={this.renderCustomView}
              renderLoading={() =>  <ActivityIndicator size="large" color="#0000ff" />}
              user={{
                _id: this.state.SenderId,
                name: this.state.MessageFrom,
               }} 
          />
        );  
      }
}
