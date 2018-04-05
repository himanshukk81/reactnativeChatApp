import React, { Component } from 'react'
import { Router, Scene, ActionConst } from 'react-native-router-flux'
import List from './List.js'
import Detail from './Detail.js'
import Login from './login.js'
import { TouchableOpacity } from 'react-native';
// import { Icon } from 'native-base';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Groups from './groups.js'
import GroupDetail from './groupDetail.js'
import { Icon } from 'react-native-elements'
import AddMemberPage from './addMember.js' 
// import NavigationDrawer from './NavigationDrawer.js' 
// const io = require('socket.io-client');
// import Drawer from 'react-native-drawer';

//<Icon name="menu" size={30} color="black"/>
                    /* <Icon name='home' /> */

const DrawerRoutes = {
	Users: {
		screen: List,
		navigationOptions:({navigation}) => ({
            title: "Users",
            headerLeft:(
              <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>

                  <Icon name='menu' />
              </TouchableOpacity>

              
            ),
            headerStyle: { paddingRight: 10, paddingLeft: 10 }
        })
  },
  Groups: {
		screen: Groups,
		navigationOptions:({navigation}) => ({
            title: "Groups",
            headerLeft:(
              <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                <Icon name="menu" />
              </TouchableOpacity>
            ),
        })
  },
	Logout: {
		screen: Login,
		navigationOptions:({navigation}) => ({
            title: "Login",
            headerLeft:null
    })
  },
  
};
const stackNavigations = StackNavigator({
	Signin: { screen: Login,
		navigationOptions:({navigation}) => ({
            title: "Login",
            headerLeft:null
        })
  },
  // Groups: {
	// 	screen: Groups,
	// 	navigationOptions:({navigation}) => ({
  //           title: "Groups",
  //           headerLeft:(
  //             <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
  //               <Icon name="menu" />
  //             </TouchableOpacity>
  //           ),
  //       })
  // },
	Home: {
		screen: DrawerNavigator(DrawerRoutes),
  },
  GroupDetail: {
    screen:GroupDetail,
    navigationOptions:({navigation}) => ({
      title: "GroupDetail"
    })
  },

  Detail: {
    screen:Detail,
    navigationOptions:({navigation}) => ({
      title: "Detail"
    })
  },
  
  AddMemberPage:{
    screen:AddMemberPage,
    navigationOptions:({navigation}) => ({
      title: "AddMember"
    })
  }
});
export default stackNavigations;