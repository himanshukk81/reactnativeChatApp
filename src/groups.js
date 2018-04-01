import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View,ScrollView,ActivityIndicator,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import { Container, Content, Item, List, Body, ListItem ,CheckBox} from 'native-base';
import { environment } from './config/environment';
// import { CheckBox } from 'react-native-elements'
var groupUsers=[];
export default class Groups extends Component {
  state = {
    modalVisible: false,
    isLoading:false,
    dataSource:[],
    selectedUsers:[],
    groups:[],
    modalVisible: false,
    groupName:'',
    userId:1780
  };
  


  constructor(props)
  {
    super(props);
    // this.setState({isLoading:true});
    // this.getUsersList();

    this.getGroupsList();
    console.log("Construcotr calll===");
  }

  componentDidMount(){ 
    
        // alert("Hello this is me")
        var obj1={};       
        obj1.userId=1780;
        this.setState({isLoading:true});
        // this.setState({isLoading:true});  
        console.log("Did mount called");  
  }

  getGroupsList()
  {
      var info={};
      info.userId=1780;
      var object = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
      };
      fetch(environment.API_URL.localUrl+'group/groups',object)
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.length==0)
          {
            alert("Sorry No Groups for you!!!!");
            return;
          }
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
        
          this.getUsersList();
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
    if(!visible)
    {
      this.setState({isLoading:true});
      this.getGroupsList();
    }
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
    data.createdBy=this.state.userId;
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
    fetch(environment.API_URL.localUrl+'group/insertGroup',object)
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
    // alert("Group Chat===="+item);
    var groupInfo={};
    groupInfo.groupId=item.id;
    groupInfo.userId=this.state.userId;
    this.props.navigation.navigate('GroupDetail', groupInfo);
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
                          <Text>{item.mobile}</Text>
                        </Body>
                      </ListItem>
                    ))}
                    </Content>
            </Container>
          </Modal>
                  
        

           

                <TouchableHighlight
                        onPress={() => {
                          this.setModalVisible(true);
                        }}>
                        <Text>Add Group</Text>
                </TouchableHighlight>         

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

