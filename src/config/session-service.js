var userInfo;
var groupInfo;
var socketInfo;
const io = require('socket.io-client');
export  const SessionService={
    setUser(info)
	{
        userInfo=info; 
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
        var localUrl="192.168.1.44:3001" //TechCraftz network
        var liveUrl="https://reactnativechat.herokuapp.com";
        socket = io(liveUrl, {
        transports: ['websocket']
        })
        socket.on('connect', () => {
         console.log("socket connected")             
        })
        
        socket.emit('userJoined',data);

        socket.on('connect_error', (err) => {
        console.log("connection error==="+err);
        })

        socket.on('disconnect', () =>{
          console.log("Disconnected Socket!")
        })
        socketInfo=socket;

    },
    getUserSockets()
    {
       return socketInfo; 
    }
}