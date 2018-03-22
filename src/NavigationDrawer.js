import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import Menu from './sidemenu.js';
import {Actions, DefaultRenderer} from 'react-native-router-flux';

// const  state = this.props.navigation.state;
export default class NavigationDrawer extends Component {

    render(){
        



        return (
            <Drawer
                ref="navigation"
                open={this.props.navigation.state.params.open}
                onOpen={()=>Actions.refresh({key:this.props.navigation.state.key, open: true})}
                onClose={()=>Actions.refresh({key:this.props.navigation.state.key, open: false})}
                type="displace"
                content={<Menu />}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}
                styles={drawerStyles}
                tweenHandler={(ratio) => {
                  return {
                    mainOverlay: { opacity: ratio === 0 ? 0 : 0.3, backgroundColor: '#000' }
                  }
                }}
                >
                
            </Drawer>
        );
    }


}

const drawerStyles = {
    drawer: {
        shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 1
    },
    main: { paddingLeft: 0 }
}