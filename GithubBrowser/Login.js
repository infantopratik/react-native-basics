'use strict';

import React, { Component } from 'react';
import buffer from 'buffer';
import { Text, View, StyleSheet, Image, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native';
import AuthService from './AuthService';

export default class Login extends Component {
  constructor(props){
      super(props);

      this.state = {
        showProgress: false,
        secureTextEntry: true
      }
  }

  render() {
    var errorCtrl = <View />;
    if(!this.state.success && this.state.badCredentials){
      errorCtrl = <Text style={styles.error}>That username and password did not work</Text>
    }

    if(!this.state.success && this.state.unknownError){
      errorCtrl = <Text style={styles.error}>We experienced an unexpected issue</Text>
    }
    return(
      <View style = {styles.container}>
        <Image style={styles.logo} source={require('./img/Octocat.png')}></Image>
        <Text style={styles.heading}>Github Browser</Text>
        <TextInput
          onChangeText = {(text) => this.setState({username: text})}
          style={styles.input}
          placeholder="Github username" />
        <TextInput
          onChangeText = {(pswd) => this.setState({password: pswd})}
          style={styles.input}
          placeholder="Github password"
          secureTextEntry={this.state.secureTextEntry}/>
        <TouchableHighlight
          onPress = {this.onLoginPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableHighlight>

        {errorCtrl}

        <ActivityIndicator
          animating = {this.state.showProgress}
          size = "large"
          style = {styles.loader}
        />
      </View>
    );
  }

  onLoginPressed(){
    console.log('Attempting to login with username ' + this.state.username + 'and password' + this.state.password );
    this.setState({ showProgress: true });

    AuthService.login({
      username: this.state.username,
      password: this.state.password
    }, (results) => {
      this.setState(Object.assign({
        showProgress: false
      }, results));

      if(results.success && this.props.onLogin){
        this.props.onLogin();
      }
    });

  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    padding: 10,
    // justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  heading: {
    fontSize: 30,
    marginTop: 30
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48bbec',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 5
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 20
  },
  error:{
    color: 'red',
    paddingTop: 10
  }
});
