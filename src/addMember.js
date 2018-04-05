import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View,ScrollView,ActivityIndicator,StyleSheet,TouchableOpacity,TextInput,Button} from 'react-native';
import { Container, Content, Item, List, Body, ListItem ,CheckBox,Icon} from 'native-base';
import { environment } from './config/environment';
import {GroupDetail} from './groupDetail.js';
import {SessionService} from './config/session-service';

var groupUsers=[];
// var userId=SessionService.getUser().id;
export default class AddMemberPage extends Component {
  
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
    // this.setState({isLoading:true});
    // this.getUsersList();
        console.log("Construcotr calll===");
        groupUsers=[];
        this.getUsersList()
  }

  componentDidMount(){ 
    
        // alert("Hello this is me")
        // var obj1={};       
        // obj1.userId=1780;
        
        this.setState({isLoading:true,groupName: SessionService.getGroupInfo().name});
        // this.setState({isLoading:true});  
        console.log("Did mount called");  
  }

 
  
  getUsersList()
  {
    // console.log("Memebers infooo46==="+SessionService.getGroupInfo().members);
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
          this.setState({
              isLoading: false,
              dataSource: responseJson,

              }, function(){
          });
          var my_check=[];


          // console.log("Memebers infooo==="+this.props.navigation.state.params.members);

          
          var members=(SessionService.getGroupInfo().member).split(',');


          var flag=false;
          groupUsers.push(this.state.userId);
          for(var i=0;i<responseJson.length;i++)
          {
            for(var j=0;j<members.length;j++)
            {
              if(responseJson[i].id==members[j])
              {
                responseJson[i].pressed=true;
                flag=true;
                groupUsers.push(responseJson[i].id);
              }
            }   
            if(!flag)
            {
              responseJson[i].pressed=false; 
            }
            flag=false;
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




  

  checkItem(item)
  {
    // groupUsers=[];
    var groupInfo=SessionService.getGroupInfo();
    for(var i=0;i<this.state.dataSource.length;i++)
    {
      if(this.state.dataSource[i].id==item.id)
      {
        this.state.dataSource[i].pressed=!this.state.dataSource[i].pressed;
        // groupUsers.push(this.state.dataSource[i].id);
        
        var members=SessionService.getGroupInfo().member.split(",");
        var itemId=(item.id).toString(); // for convert in string........
        if(members.indexOf(itemId)==-1)
        {
          
          // SessionService.getGroupInfo().member+=","+item.id;

          groupInfo.member+=","+item.id;
          
          groupUsers.push(this.state.dataSource[i].id);
        }
        else 
        {
          // var stringArray=SessionService.getGroupInfo().member.split(",");
          for(var k=0;k<groupUsers.length;k++)
          {
            if(groupUsers[k]==item.id)
            {
              groupUsers.splice(k,1);
            }
          }
          groupInfo.member=groupUsers.toString();
          // var member1=SessionService.getGroupInfo().member;
          // console.log("group info meber==="+member1);
          // SessionService.setGroupInfo(SessionService.getGroupInfo())
        }
        SessionService.setGroupInfo(groupInfo)

        var groupInfo=SessionService.getGroupInfo();
        console.log("group info==="+JSON.stringify(groupInfo));
        // console.log("Group info===="+JSON.stringify(SessionService.getGroupInfo()));
        // SessionService.setGroupInfo(SessionService.getGroupInfo())

        // this.props.navigation.state.params.members+=item.id;
      }
    }
    
    this.setState({dataSource:this.state.dataSource});
    console.log("Datasource info==="+JSON.stringify(this.state.dataSource));
  }

  handleGroupName = (text) => {
    this.setState({ groupName: text});
  }



   updateGroup()
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
    // groupUsers.push(this.state.userId);
    var groupString=groupUsers.toString();
    var data={};
    data.name=this.state.groupName;
    data.member=groupString;
    data.modifiedDate=new Date();
    data.userId=this.state.userId;
    var groupInfo=SessionService.getGroupInfo();
    data.id=groupInfo.groupId;
    this.updateGroupInfo(data)
  }


  updateGroupInfo(info)
  {
    
    var object = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    };
    fetch(environment.API_URL.liveUrl+'group/updateGroup',object)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          }, function(){
        });
        alert("Successfully update...");
      })
      .catch((error) => {
        alert("Something went wrong please try again");
        this.setState({
            isLoading: false,
            },function(){
        });
        alert("Failed to fetch users please try again");
        console.error("error in users list fetch==="+error);
    });
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
                 <Text style={{textAlign: 'center'}}>Select User</Text>

                    <TextInput  style={{alignItems:'flex-start'}}  placeholder="Enter Group Name" onChangeText={this.handleGroupName} value={this.state.groupName}/>

                    <TouchableOpacity  onPress={() => this.updateGroup()} style={{alignItems:'flex-end'}}>
                            <Text >Update Group</Text>
                    </TouchableOpacity>       

              <ScrollView>
                
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

