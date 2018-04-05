import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View,ScrollView,ActivityIndicator,StyleSheet,TouchableOpacity,TextInput,Button} from 'react-native';
import { Container, Content, Item, List, Body, ListItem ,CheckBox,Icon} from 'native-base';
import { environment } from './config/environment';
import {GroupDetail} from './groupDetail.js';
import {SessionService} from './config/session-service';

var groupUsers=[];

var addGroup;
export default class Groups extends Component {
  
  state = {
    modalVisible: false,
    isLoading:false,
    dataSource:[],
    selectedUsers:[],
    groups:[],
    modalVisible: false,
    groupName:'',
    userId:SessionService.getUser().id
  };
  


  constructor(props)
  {
    super(props);
    this.getGroupsList();
    addGroup=this;
    console.log("Construcotr calll===");
  }

  componentDidMount(){ 
    
        // alert("Hello this is me")
        // var obj1={};       
        // obj1.userId=1780;
        var userInfo=SessionService.getUser();
        this.setState({isLoading:true,userId:userInfo.id});
        // this.setState({isLoading:true});  
        console.log("Did mount called");  
  }

  getGroupsList()
  {
      var info={};
      info.userId=this.state.userId;
      var object = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
      };
      fetch(environment.API_URL.liveUrl+'group/groups',object)
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.length==0)
          {
            alert("Sorry No Groups for you!!!!");
            this.setState({
              isLoading: false
             });
          }
          else
          {
            this.setState({
              isLoading: false,
              groups: responseJson,
  
              }, function(){
            });
          }

        })
        .catch((error) => {
          this.setState({
              isLoading: false,
              },function(){
          });
          alert("Failed to fetch users please try again");
          console.error("error in users list fetch==="+error);
        });

      console.log("Group list==="+JSON.stringify(this.state.groups));
  }
  
  getUsersList()
  {
     this.setState({
      isLoading: true
     });
      var info={};
      info.userId=this.state.userId;
      var object = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
      };


      fetch(environment.API_URL.liveUrl+'user/users',object)
        .then((response) => response.json())
        .then((responseJson) => {
          // this.setState({
          //     isLoading: false,
          //     dataSource: responseJson,

          //     }, function(){
          // });
          var my_check=[];
          for(var i=0;i<this.state.dataSource.length;i++)
          {
            // my_check.push(false);
            responseJson[i].pressed=false;
          }

          this.setState({
            isLoading: false,
            dataSource:responseJson
          }) 

          // console.log("state info=="+JSON.stringify(this.state));
          
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




  

  checkItem(item)
  {
    for(var i=0;i<this.state.dataSource.length;i++)
    {
      if(this.state.dataSource[i].id==item.id)
      {
        this.state.dataSource[i].pressed=!this.state.dataSource[i].pressed;
        groupUsers.push(this.state.dataSource[i].id);
      }
    }
    
    this.setState({dataSource:this.state.dataSource});
    console.log("Datasource info==="+JSON.stringify(this.state.dataSource));
  }

  handleGroupName = (text) => {
    this.setState({ groupName: text});
  }



  saveGroup()
  {
    
    if(!this.state.groupName)
    {
      alert("Please Enter Group name");
      return;
    }
    if(groupUsers.length==0)
    {
      alert("Please Select Atleast one member");
      return;
    }

    this.setState({isLoading:true});
    groupUsers.push(this.state.userId);
    var groupString=groupUsers.toString();
    // this.setState({members:groupString});
    var data={};
    data.name=this.state.groupName;
    data.member=groupString;
    data.createDate=new Date();
    data.userId=this.state.userId;
    // data.createdBy=this.state.userId;
    this.saveGroupInfo(data)
  }


  saveGroupInfo(info)
  {
    
    var object = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    };
    fetch(environment.API_URL.liveUrl+'group/insertGroup',object)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.length>0)
        {
          this.setState({
            isLoading: false,
            groups: responseJson,

            }, function(){
          });
        }
        else
        {
          this.setState({
            isLoading: false,
          });
          // alert("No groups right now!");
        }
      
        // this.getUsersList();

        this.setModalVisible(false);
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
  groupChat(item)
  {
    var groupInfoExist=false;
    if(SessionService.getGroupInfo())
    {
      if(SessionService.getGroupInfo().groupId==item.id)
      {
        groupInfoExist=true;
      }
    }
    if(!groupInfoExist)
    {
      var groupInfo={};
      groupInfo.groupId=item.id;
      groupInfo.userId=this.state.userId;
      groupInfo.member=item.member;
      groupInfo.senderName="Himanshu";
      groupInfo.name=item.name;
      SessionService.setGroupInfo(groupInfo);
    }  
    
    this.props.navigation.navigate('GroupDetail', groupInfo);
  }
 
  static navigationOptions = {
    headerRight: (
    <Button onPress={() => addGroup.setModalVisible(true)}
      title="Add Group"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"/>   
    )}
   
  setModalVisible(visible) {
    this.getUsersList();
    this.setState({modalVisible: visible});
    if(!visible)
    {
      this.setState({isLoading:true});
      this.getGroupsList();
    }
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
      <View style={{marginTop: 22}}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>


                <Text style={{textAlign: 'center'}}>Select User</Text>

                    <TextInput  style={{alignItems:'flex-start'}}  placeholder="Enter Group Name" onChangeText={this.handleGroupName}/>

                    <TouchableOpacity  onPress={() => this.saveGroup()} style={{alignItems:'flex-end'}}>
                            <Text >Save Group</Text>
                    </TouchableOpacity>                  
              </View>
            </View>

            <Container>
                    
                    <Content>
                    { this.state.dataSource.map((item, index) => (
                      <ListItem key = {item.id} onPress={() => this.checkItem(item)}>
                        <CheckBox checked={this.state.dataSource[index].pressed}/>
                        <Body>
                          <Text>{item.name!=null ? item.name :item.mobile}</Text>
                          
                        </Body>
                      </ListItem>
                    ))}
                    </Content>
            </Container>
          </Modal>
                
          <ScrollView>
              
              <View style={{ flex: 1, paddingTop: 0 }}>
                  
                  {
                      this.state.groups.map((item, index) => (
                          <TouchableOpacity
                              key={item.id}
                              style={styles.container}
                              onPress={() => this.groupChat(item)}>

                              <Text style={styles.text}>
                                  {item.name}
                              </Text>
                          </TouchableOpacity>
                      ))
                  }
              </View>
          </ScrollView>
      </View>


     
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
   textAlignment:{
    alignItems: 'center',
   },
   listItem: {
    backgroundColor: '#DFDFDF',
    elevation: 5,
    margin: 4
  },
})

