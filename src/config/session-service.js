var userInfo;
var groupInfo;
export  const SessionService={
    setUser(info)
	{
        userInfo=info; 
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
    }
}