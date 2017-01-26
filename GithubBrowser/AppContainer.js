'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  AsyncStorage
} from 'react-native';
import Feed from './Feed';
import Search from './Search';
import Login from './Login';
import GithubBrowser from './index';

export default class AppContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'feed',
      isLogoutPressed: false
    };
  }

  render() {
    return (
      <TabBarIOS style = {styles.container} barTintColor = '#080d14' tintColor = 'green'>
        <TabBarIOS.Item
          title = "Feed"
          selected = {this.state.selectedTab == 'feed'}
          icon = {require('./img/inbox.png')}
          onPress = { () => this.setState({ selectedTab: 'feed' }) }
        >
          <NavigatorIOS
            style = {{
              flex: 1,
              backgroundColor: '#2b394f'
            }}
            barTintColor = '#080d14'
            tintColor = '#fff'
            titleTextColor = '#fff'
            initialRoute = {{
              component: Feed,
              title: 'Feed'
            }}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title = "Search"
          selected = {this.state.selectedTab == 'search'}
          icon = {require('./img/search.png')}
          onPress = { () => this.setState({ selectedTab: 'search' }) }
        >
          <NavigatorIOS
            style = {{
              flex: 1
            }}
            barTintColor = '#080d14'
            tintColor = '#fff'
            titleTextColor = '#fff'
            initialRoute = {{
              component: Search,
              title: 'Search'
            }}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2b394f'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
