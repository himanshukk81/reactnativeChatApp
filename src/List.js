import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,ActivityIndicator,ScrollView,AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { environment } from './config/environment';



// import { Login } from './login';


// const goDetail = () => {
//     Actions.Detail()
//  } 


// const List = () => {
//     const goToAbout = () => {
//     alert("hello")
//        Actions.Detail()
//     }
//     return (
//        <TouchableOpacity style = {{ margin: 128 }} onPress = {goToAbout}>
//           <Text>This is HOME!</Text>
//        </TouchableOpacity>
//     )
//  }
//  export default List

var obj1={};
 
class List extends Component {
//    state = {
//       names: [
//          {
//             id: 0,
//             name: 'Ben',
//          },
//          {
//             id: 1,
//             name: 'Susan',
//          },
//          {
//             id: 2,
//             name: 'Robert',
//          },
//          {
//             id: 3,
//             name: 'Mary',
//          },
//       ]
//    }

    state={
        data:''
    }



    constructor(props) {    

        console.log("Constructor calll.......");
        super(props);


        console.log("props data==="+this.props);
        this.state ={ isLoading: true}  



       
        
        // this.state={
        //     data:''
        // }   
        // this.state1={
        //     isLoading:true
        // }
    }

    componentWillMount () {
        Actions.refresh({key: 'drawer', open: false });
    }


    


    componentDidMount(){    

       console.log("prpps info==="+this.props);
        // alert("Did amount called");
        // var obj1={};
        // //  AsyncStorage.getItem('userInfo', (err, result) =>{
        // //     console.log("list.js 65===="+result);
        // //     obj1=JSON.parse(result);
        // //     obj1.userId=obj1.id;
        // //     // alert("68 line========"+JSON.stringify(obj1));
        // //     this.getUsersList(obj1);
        // //     // alert("Objec infos 65=="+result);
        // // });         

        // // AsyncStorage.getItem('userInfo').then((value)=>{
        // //     alert("user info data==="+value);
        // // });         


        // var value = await AsyncStorage.getItem('userInfo');


        // console.log("Value Data==="+value);

        // var loginInfo=Login.getLoginInfo();  


        // alert("Login info=="+loginInfo);

        
        obj1.userId=this.props.item.id;
        this.getUsersList(obj1);
    }

    getUsersList(infos)
    {
        // alert("Object infos=="+JSON.stringify(infos));
        // console.log("74 line==="+JSON.stringify(obj1));
        var object = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(infos)
        };
        fetch(environment.API_URL.liveUrl+'user/users',object)
         .then((response) => response.json())
         .then((responseJson) => {
            // alert("User list==="+JSON.stringify(responseJson));
            // console.log("users list====="+responseJson);
            // this.setState({data:responseJson})
            this.setState({
                isLoading: false,
                dataSource: responseJson,
                }, function(){
            });

            // alert("users=="+JSON.stringify(this.state.data));
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

   
   alertItemName = (item) => {
      alert(item.name)
   }
    goDetail1=(item)=>{
        obj1.receiverId=item.id;
        console.log("Item nme=="+item.name);
        Actions.Detail({object :obj1})
    }
 
   
   render() {
    if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
    }  
      return (

        <ScrollView>
         <View style={{flex: 1, paddingTop:0}}> 
            {
               this.state.dataSource.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress = {()=>this.goDetail1(item)}>
                     
                     <Text style = {styles.text}>
                        {item.mobile}
                     </Text>
                  </TouchableOpacity>
               ))
            }
         </View>
         </ScrollView> 
      )
   }
}
export default List

const styles = StyleSheet.create ({
   container: {
      padding: 10,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   text: {
      color: '#4f603c'
   }
})