import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator, Image, TextInput, Button, KeyboardAvoidingView, ScrollView, AsyncStorage,BackHandler } from 'react-native'
import { environment } from './config/environment';
import { Container, Header, Content, Icon } from 'native-base';
import {SessionService} from './config/session-service';

export default class Profile extends Component {
    constructor(props) {
        super(props);
         this.state=SessionService.getUser();

    }

    
    componentDidMount() {
     
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

    
    updateProfile = () => {
        this.setState({ isLoading: true })
        this.updateProfile();
    }

    handleUserName =(text) =>{
        this.setState({name:text}) 
    }
    updateProfile() {
        var object = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        };
        fetch(environment.API_URL + 'user/updateUser', object)
            .then((response) => response.json())
            .then((responseJson) => {
                SessionService.setUser(responseJson[0]);
                alert("Successfully Update Profile");
                this.setState({ isLoading: false })
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                console.error("Error in sign up::==" + error);
                alert("Something Went Wrong Please Try Again===="+error);
            });
    }

    
    render() {

        return(
            <View style={styles.container}>
                            <StatusBar backgroundColor="#002d38" barStyle="light-content" />

                                <View>                    
                                    <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Enter Mobile Number" placeholderTextColor="#ffffff" />

                                    <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Enter User Name" placeholderTextColor="#ffffff" onChangeText={this.handleUserName} />
                                
                                    <TouchableOpacity style={styles.button} onPress={() => this.signIn()}>
                                        <Text style={styles.buttonText}>Proceed</Text>
                                    </TouchableOpacity>

                                    {this.state.isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}

                                    
                                </View>
            </View>
        )     
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#546e7a',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        width: 300,
        backgroundColor: '#8d8d8d',
        borderRadius: 25,
        paddingHorizontal: 36,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#005662',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
    }
})