import React, { Component } from 'react'
import List from './List.js'
import Detail from './Detail.js'
import Login from './login.js'
import Groups from './groups.js'
import GroupDetail from './groupDetail.js'
import AddMemberPage from './addMember.js'
import First from "./first.js"
import Profile from './profile.js'
import { TouchableOpacity } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements'
import {SessionService} from './config/session-service';
import {AsyncStorage,Platform } from 'react-native'

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
  Profile: {
		screen: Profile,
		navigationOptions:({navigation}) => ({
            title: "Profile",
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
            title: "Logout",
            headerLeft:null
    })
  },
  
};
const stackNavigations = StackNavigator({
	Signin: { screen: First,
		    navigationOptions:({navigation}) => ({
            title: "Login",
            headerLeft:null
        })
  },
	Home: {
    screen: DrawerNavigator(DrawerRoutes)
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