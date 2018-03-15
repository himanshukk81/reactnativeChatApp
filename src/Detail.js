import React, { Component } from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import { Actions } from 'react-native-router-flux'
class Detail extends Component {
// const Detail = () => {
// console.log("data===="+JSON.stringify(this.props));
//    const goToHome = () => {
//       Actions.List()
//    } 

//     return (
//         <TouchableOpacity style = {{ margin: 128 }} onPress = {goToHome}>
//            <Text>This is {this.props.name}</Text>
//         </TouchableOpacity>
    
//      )

     
   

// }

constructor(props)
{
  super(props)
  alert("Props data==="+JSON.stringify(this.props));
  console.log("Props data=="+JSON.stringify(this.props));
  // // alert("data for state==="+JSON.stringify(this.state2));
  // state = {
  //   messages: [],
  //   userId:this.makeid()
  // }
}

componentDidMount() {    
      // this.state2={data:this.props}
      // socket = io('https://reactnativechat.herokuapp.com', {
      //   transports: ['websocket']
      // })
      // socket.on('connect', () => {
      //   console.log("socket connected")
      // })

      // socket.on('connect_error', (err) => {
      //   console.log("connection error==="+err);
      //   // alert("Connection error listen==="+err);
      // })

      // socket.on('disconnect', () => {
      //   // alert("Connection disconnect===");
      //   console.log("Disconnected Socket!")
      // })

      // var data={userId:12}

      // socket.emit('join',data);

      // socket.on('chat_message', (messages) => {
      //   this.onReceivedMessage(messages)
      // })     

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
}

onReceivedMessage(messages){
  this.storeMessages(messages);
}
onSend(messages = []) {
  var messageInfo={};
  messageInfo.message=messages[0].text;
  messageInfo.receiverId=12;
  socket.emit('chat_message',messageInfo);
  this.storeMessages(messages);
}
storeMessages(messages) {
  this.setState((previousState) => {
    return {
      messages: GiftedChat.append(previousState.messages, messages),
      };
  });
}
render() {
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
}
  
export default Detail