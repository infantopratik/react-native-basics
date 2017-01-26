'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  ActivityIndicator,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import AuthService from './AuthService';

export default class SearchResults extends Component {
  constructor(props){
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource: ds,
      showProgress: true,
      searchQuery: props.searchQuery
    };
  }

  componentDidMount(){
    this.doSearch();
  }

  doSearch(){
      console.log('Doing search for ', this.state.searchQuery);
      var url = 'https://api.github.com/search/repositories?q=' + encodeURIComponent(this.state.searchQuery);

      fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            repositories: responseData.repositories,
            dataSource: this.state.dataSource.cloneWithRows(responseData.items)
          });
        })
        .finally(() => {
          this.setState({showProgress: false});
        })
  }

  renderRow(rowData){
    return (
      <View style={{
        padding: 20,
        borderColor: '#000',
        borderBottomWidth: 1,
        backgroundColor: '#080d14'
      }}>
        <Text style = {{
          fontSize: 20,
          fontWeight: '600',
          color: 'white'
        }}>
          {rowData.full_name}
        </Text>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          marginBottom: 20
        }}>
          <View style={styles.repoCell}>
            <Image source = {require('./img/star.png')} style = {styles.repoCellIcon}/>
            <Text style = {styles.repoCellLabel}>{rowData.stargazers_count }</Text>
          </View>
          <View style={styles.repoCell}>
            <Image source = {require('./img/fork.png')} style = {styles.repoCellIcon}/>
            <Text style = {styles.repoCellLabel}>{rowData.forks }</Text>
          </View>
          <View style={styles.repoCell}>
            <Image source = {require('./img/issues.png')} style = {styles.repoCellIcon}/>
            <Text style = {styles.repoCellLabel}>{rowData.open_issues }</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    if(this.state.showProgress){
      return (
        <View style = {{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#080d14'
        }}>
          <ActivityIndicator
            animating = {true}
            size = "large"
          />
        </View>
      );
    }

    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#080d14'
      }}>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow.bind(this)}
          automaticallyAdjustContentInsets = {false}
        >

        </ListView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  repoCell: {
    width: 50,
    alignItems: 'center'
  },
  repoCellIcon: {
    width: 20,
    height: 20
  },
   repoCellLabel: {
     paddingTop: 10,
     textAlign: 'center',
     color: 'white'
   }
});
