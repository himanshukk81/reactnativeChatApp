import React from 'react'
import { Router, Scene, ActionConst } from 'react-native-router-flux'
import List from './List.js'
import Detail from './Detail.js'
import Login from './login.js'

// import Home from './Home.js'
const Routes = () => (
    <Router>
       <Scene key = "root"  navigationBarStyle={{ backgroundColor:'#40838f'}}>
          <Scene key = "Login" component = {Login} title = "Login" titleStyle={{color : "#FFF"}} />    
          <Scene key = "Users" component = {List} title = "Users" initial = {true} />
          <Scene key = "Detail" component = {Detail} title = "Detail"  />
       </Scene>
    </Router>
 )
export default Routes