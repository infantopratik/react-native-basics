/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Exponent from 'exponent';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// var Login = require('./Login');
import Login from './Login';

export default class GithubBrowser extends Component {
  constructor(props){
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.state = {
      isLoggedIn: false
    };
  }
  onLogin = () => {
    this.setState({isLoggedIn: true});
    // console.log('Logged In');
  }
  render() {
    if(this.state.isLoggedIn){
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome!</Text>
        </View>
      );
    } else {
      return (
        <Login onLogin={this.onLogin}/>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

Exponent.registerRootComponent(GithubBrowser);

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
