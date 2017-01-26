'use strict';

import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native';
import AuthService from './AuthService';
import SearchResults from './SearchResults';

export default class Search extends Component {
  constructor(props){
      super(props);

      this.state = {

      }
  }

  render() {

    return(
      <View style = {styles.container}>
        <TextInput
          onChangeText = {(text) => this.setState({
            searchQuery: text
          })}
          style={styles.input}
          placeholder="Search Query"
          placeholderTextColor = "#ddd"
          selectionColor = "white"
          keyboardAppearance = 'dark' />
        <TouchableHighlight
          onPress = {this.onSearchPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>
      </View>
    );
  }

  onSearchPressed(){
    console.log('Attempting to search with query ' + this.state.searchQuery);
    this.props.navigator.push({
      component: SearchResults,
      title: "Results for '" + this.state.searchQuery + "'",
      passProps: {
        searchQuery: this.state.searchQuery
      }
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#080d14'
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
    borderColor: '#48bbec',
    borderRadius: 3,
    color: "white"
  },
  button: {
    height: 50,
    backgroundColor: '#48bbec',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 3
  },
  buttonText: {
    fontSize: 22,
    color: '#080d14',
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
