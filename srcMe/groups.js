import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View,ScrollView,ActivityIndicator,StyleSheet,TouchableOpacity} from 'react-native';
import { Container, Content, Item, List, Body, ListItem ,CheckBox} from 'native-base';
import { environment } from './config/environment';
// import { CheckBox } from 'react-native-elements'

export default class Groups extends Component {
  state = {
    modalVisible: false,
    isLoading:false,
    dataSource:[],
    selectedUsers:[]
  };


  constructor(props)
  {
    super(props);
    // this.setState({isLoading:true});
    this.getUsersList();
  }

  componentDidMount(){ 
    
        // alert("Hello this is me")
        var obj1={};       
        obj1.userId=1780;
        this.setState({isLoading:true});
        // this.setState({isLoading:true});

        
        
  }
  
  getUsersList()
  {
      var object = {
          method: 'GET'
      };
      fetch(environment.API_URL.localUrl+'user/allUsers',object)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
              isLoading: false,
              dataSource: responseJson,

              }, function(){
          });
          var my_check=[];
          for(var i=0;i<this.state.dataSource.length;i++)
          {
            // my_check.push(false);
            responseJson[i].pressed=false;
          }

          this.setState({
            dataSource:responseJson
          }) 

          console.log("state info=="+JSON.stringify(this.state));
          
          // alert("New array=="+JSON.stringify(this.state.dataSource));
        })
        .catch((error) => {
          this.setState({
              isLoading: false,
              },function(){
          });
          alert("Failed to fetch users please try again");
          console.error("error in users list fetch==="+error);
      });  
  }

  setModalVisible(visible) {
      this.getUsersList();
  }
  onCheckBoxPress()
  {
    alert("checkbox print==");  
  }

  checkItem(item)
  {
    for(var i=0;i<this.state.dataSource.length;i++)
    {
      if(this.state.dataSource[i].id==item.id)
      {
        this.state.dataSource[i].pressed=!this.state.dataSource[i].pressed;
      }
    }
    this.setState({dataSource:this.state.dataSource});

    console.log("Datasource info==="+JSON.stringify(this.state.dataSource));
  }

  render() 
  {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    } 
    return(
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
              
      </Modal>


     
    )
  }
}  


const styles = StyleSheet.create ({
   container: {
      padding: 10,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   text: {
      color: '#4f603c'
   },

   listItem: {
    backgroundColor: '#DFDFDF',
    elevation: 5,
    margin: 4
  },
})