import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, AsyncStorage } from 'react-native'
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux'
import { environment } from './config/environment';
var obj1 = {};

class List extends Component {
    state = {
        data: ''
    }

    constructor(props) {

        console.log("Constructor calll.......");
        super(props);


        console.log("props data===" + this.props.navigation.state.params);
        this.state = { isLoading: true }




        obj1 = { 'userId': this.props.navigation.state.params.id };

        this.getUsersList(obj1);
    }

  


    getUsersList(infos) {

        var object = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infos)
        };
        fetch(environment.API_URL.liveUrl + 'user/users', object)
            .then((response) => response.json())
            .then((responseJson) => {
                // alert("User list==="+JSON.stringify(responseJson));
                // console.log("users list====="+responseJson);
                // this.setState({data:responseJson})
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function () {
                });

                // alert("users=="+JSON.stringify(this.state.data));
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                }, function () {
                });
                alert("Failed to fetch users please try again");
                console.error("error in users list fetch===" + error);
            });
    }


    alertItemName = (item) => {
        alert(item.name)
    }
    goDetail1 = (item) => {
        obj1.receiverId = item.id;
        console.log("Item nme==" + item.name);
        Actions.Detail({ object: obj1 })
    }

    // SideMenuOpenClose(){
    //     this.props.navigation.navigate('DrawerOpen'); 
    // }
    // static navigationOptions = {
    //     headerLeft: null,
        
    // }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <ScrollView>
                
                <View style={{ flex: 1, paddingTop: 0 }}>
                    
                    {
                        this.state.dataSource.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.container}
                                onPress={() => this.goDetail1(item)}>

                                <Text style={styles.text}>
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

const styles = StyleSheet.create({
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