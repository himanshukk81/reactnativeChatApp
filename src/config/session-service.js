var userInfo;
var groupInfo;
var socketInfo;
var token;
const io = require('socket.io-client');
import FCM from "react-native-fcm";
import {AsyncStorage,Platform } from 'react-native'
export  const SessionService={
    setUser(info)
	{
        userInfo=info; 
        // this.enableNotification();
        this.setUserSockets();
    },

    
    
    getUser()
    {
        return userInfo;
    },

    setGroupInfo(info)
    {
        groupInfo=info;  
    },
    getGroupInfo()
    {
        return groupInfo;
    },

    setUserSockets()
    {
        var data={};
        data.userId=this.getUser().id;
        // data.userId=1837576;
        var localUrl; 
        var socketUrl;
        localUrl="http://192.168.1.44:3001/";  // Techcraftz network 
        // localUrl="http://192.168.43.152:3001"         //  Tripleplay network
        // localUrl="http://192.168.43.152:3001"   // home network
        // socketUrl=localUrl;
        socketUrl="https://reactnativechat.herokuapp.com";


        socket = io(socketUrl, {
        transports: ['websocket'],
        forceNew:true
        })
        socket.on('connect', () => {
        //  alert("connected---"); 
           
         console.log("socket connected")             
        })


        setInterval(function() { 
            socket.emit("keep-alive", null) 
        },20*1000);
        socket.emit('userJoined',data);

        socket.on('connect_error', (err) => {
            // alert("Connection error==="+err);   
            // socket.connect();
        // console.log("connection error==="+err);
        socket.connect()
        })
        socket.on('disconnect', (data1) =>{
            
            // alert("disconnect 59==="+J SON.stringify(data)); 
            // socket.connect();
            // socket.emit('userJoined',data);   
           console.log("Disconnected Socket!")
           socket.connect()
        })

        socket.on('user_disconnected',()=>{
            // alert("disconnect 64==="+JSON.stringify(data));  
            // socket.emit('userJoined',data);
            // socket.connect();
            socket.connect()
        })
        socketInfo=socket;
    },
    getUserSockets()
    {
       return socketInfo; 
    },
    setFcmToken(token1)
    {
        token=token1
    },
    getFcmToken()
    {
        return token;
    },

  

}