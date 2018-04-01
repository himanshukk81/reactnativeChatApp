import React, { Component } from 'react'
import {Text, View, TouchableOpacity, StyleSheet,ActivityIndicator} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { GiftedChat } from 'react-native-gifted-chat'
const io = require('socket.io-client');
let socket;
let userInfo;
export default class GroupDetail extends Component{

     constructor(props)
    {
        super(props);
        this.state = {
          groupMessages: [],
          userId:1780,
          isLoading:true,
          groupId:7
        }
         userInfo={ _id:this.state.userId};
       alert("props info==="+JSON.stringify(props));  
    }

    
      componentDidMount() {  
            
            // alert("props data===="+JSON.stringify(this.props));
            // alert("user info===="+);
            // this.setState({userId:this.props.params.userId,
            //                groupId:this.props.params.groupId});
            var groupInfo={};
            groupInfo.userId=this.state.userId;
            groupInfo.groupId=this.state.groupId;
            var localUrl="http://192.168.43.152";
            // var liveUrl="https://reactnativechat.herokuapp.com"

            socket = io(localUrl, {
              transports: ['websocket']
            })
            socket.on('connect', () => {
              // alert("Socket Successfully connected");
              console.log("socket connected")
             
            })
            
            socket.emit('userJoined',groupInfo);

            // this.socket.emit('message', {userCarNo: this.navParams.data});


            socket.on('connect_error', (err) => {
              console.log("connection error==="+err);
            })

            socket.on('disconnect', () => {
              console.log("Disconnected Socket!")
            })

            

            socket.on('chat_message', (messages) => {

              // alert("Message Received====="+ JSON.stringify(messages));
              console.log("Message Received====");
              // alert("Socket emit call=====");
              this.onReceivedMessage(messages)
            })     

            // this.setState({
            //   messages: [
            //     {
            //       _id: 1,
            //       text: 'Hello developer',
            //       createdAt: new Date(),
            //       user: {
            //         _id: 2,
            //         name: 'React Native',
            //         avatar: 'https://facebook.github.io/react/img/logo_og.png',
            //       },
            //     },
            //   ],
            // })


            // [{

            // "text":"hello I am here",
            // "user":{"userInfo":{"_id":123}},
            // "createdAt":"2018-03-22T05:14:46.642Z"}]  

            
            // console.log("Messages===="+JSON.stringify(this.state.messages));

            console.log("Data====="+JSON.stringify(this.state));
      }

      

      // componentWillUnmount()
      // {
      //   console.log("Call Will unmount====");
      //   socket.emit('disconnect',this.state.userId);
      // }

      // componentDidCatch()
      // {
      //   alert("Error while load this page");
      // }

      onReceivedMessage(messages){

        this.storeMessages(messages);
      }
      onSend(messages = []) {

            this.setState({isLoading:true})



            console.log("Loading icon===="+this.state.isLoading);

            //  var obj={};
            // for(var i=0;i<10;i++)
            // {
            //   if(i<=5)
            //   {
            //     obj._id=i;
            //     obj.text="Hellooo "+i;
            //     obj.user={"userInfo":{"_id":123}};
            //     obj.createdAt=new Date();
            //     this.state.messages.push(obj);
            //   }
            //   else
            //   {
            //     obj._id=i,
            //     obj.text="Hi receiver "+i,
            //     obj.createdAt=new Date(),
            //     obj.user={"_id": 124};
            //     this.state.messages.push(obj);
            //   }
            //   obj={};
              
            // }

            // this.onReceivedMessage(this.state.messages);  
        // alert("Messages===="+JSON.stringify(messages));

        // console.log("New messages==="+JSON.stringify(messages));
        var messageInfo={};
        messageInfo.message=messages[0].text;
        messageInfo.receiverId=this.props.object.receiverId;
        messageInfo.createDate=new Date();
        messageInfo.senderId=this.props.object.userId;
        socket.emit('chat_message',messageInfo);
        // // this.socket.emit('chat_message', {to: this.sendTo, text: this.message});
        this.storeMessages(messages);
      }
      storeMessages(messages){
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, messages),
            };
        });
        this.setState({isLoading:false})

        console.log("Loading icon for receiver===="+this.state.isLoading);
      }


      render() {
        return (
          // <View>
          //   {this.state.isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
          // </View>
          
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
  
// export default Detail