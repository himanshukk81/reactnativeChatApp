import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, AsyncStorage,BackHandler } from 'react-native'
import { Icon } from 'native-base';
import { environment } from './config/environment';
import {SessionService} from './config/session-service';

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




        // obj1 = { 'userId': this.props.navigation.state.params.id };
        obj1 = { 'userId': SessionService.getUser().id };
        this.getUsersList(obj1);
    }

    componentWillMount()
    {
        BackHandler.addEventListener('hardwareBackPress', () => {
            // const { dispatch, nav } = this.props;
            // alert("Press back button");
            // dispatch({ type: 'Navigation/BACK' })
            // this.props.navigation.navigate('Home');
            return true
        })
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
        fetch(environment.API_URL + 'user/users', object)
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
        this.props.navigation.navigate('Detail', obj1);
        // Actions.Detail({ object: obj1 })
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
                                    {item.name!=null ? item.name :item.mobile}
                                    
                                </Text>
                                <Text>{item.id}</Text>
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