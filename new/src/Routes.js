import React ,{ Component } from 'react'
import { Router, Scene, ActionConst } from 'react-native-router-flux'
import List from './List.js'
import Detail from './Detail.js'
import Login from './login.js'
// import NavigationDrawer from './NavigationDrawer.js' 
// const io = require('socket.io-client');
// import Drawer from 'react-native-drawer';

export default class Routes extends Component{

	render()
	{
		return(

			    <Router>
			       <Scene key = "root"  navigationBarStyle={{ backgroundColor:'#40838f'}}  >
			          <Scene key = "Login" component = {Login} title = "Login"  titleStyle={{color : "#FFF"}}  initial = {true}  />    
			          <Scene key = "Users"   title = "Users"  type={ActionConst.RESET}   component={List} />
			          <Scene key = "Detail" component = {Detail} title = "Detail"  />
			       </Scene>
		    	</Router>	
		    )	     
		
	}
}
