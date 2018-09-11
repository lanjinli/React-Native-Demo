/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component} from 'react';
import { 
  Platform,
  StyleSheet,
  PixelRatio,
  Text,
  View
} from 'react-native';
import { hidden } from 'ansi-colors';
import Header from './components/header';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>

        <Header></Header>

        <View style={styles.plate}>
          <View style={styles.row}>
            <View style={[styles.item, styles.itemColor01]}>
              <View style={styles.ite}><Text style={styles.font}>酒店</Text></View>
            </View>
            <View style={[styles.item, styles.itemColor01]}>
              <View style={styles.ite}><Text style={styles.font}>海外酒店</Text></View>
              <View style={styles.ite}><Text style={styles.font}>物价酒店</Text></View>
            </View>
            <View style={[styles.item, styles.itemColor01]}>
              <View style={styles.ite}><Text style={styles.font}>团购</Text></View>
              <View style={styles.ite}><Text style={styles.font}>民宿·客栈</Text></View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.item, styles.itemColor02]}>
              <View style={styles.ite}><Text style={styles.font}>机票</Text></View>
            </View>
            <View style={[styles.item, styles.itemColor02]}>
              <View style={styles.ite}><Text style={styles.font}>火车票</Text></View>
              <View style={styles.ite}><Text style={styles.font}>物价机票</Text></View>
            </View>
            <View style={[styles.item, styles.itemColor02]}>
              <View style={styles.ite}><Text style={styles.font}>汽车票·船票</Text></View>
              <View style={styles.ite}><Text style={styles.font}>专车·租车</Text></View>
            </View>
          </View>
          <View style={[styles.row, { marginBottom: 0}]}>
            <View style={[styles.item, styles.itemColor03]}>
              <View style={styles.ite}><Text style={styles.font}>旅游</Text></View>
            </View>
            <View style={[styles.item, styles.itemColor03]}>
              <View style={styles.ite}><Text style={styles.font}>门票</Text></View>
              <View style={styles.ite}><Text style={styles.font}>目的地攻略</Text></View>
            </View>
            <View style={[styles.item, styles.itemColor03]}>
              <View style={styles.ite}><Text style={styles.font}>邮轮旅行</Text></View>
              <View style={styles.ite}><Text style={styles.font}>定制旅行</Text></View>
            </View>
          </View>
        </View>


        <List title="呵呵呵呵呵呵"></List>
        <List title="呵呵呵呵呵呵"></List>
        <List title="呵呵呵呵呵呵"></List>

        <ImportantNews
          news={[
            '哈哈哈唂哈哈',
            '啥哈哈呵呵呆在'
          ]}
        ></ImportantNews>

      </View>
    );
  }
}

class List extends Component {
  render() {
    return (
      <View style={styles.list_item}>
        <Text style={styles.list_item_font}>{this.props.title}</Text>
      </View>
    );
  }
}

class ImportantNews extends Component {
  show(title){
    alert(title);
  }
  render() {
    let news = [];
    for(let i in this.props.news){
      let text = (
        <Text
          onPress={this.show.bind(this,this.props.news[i])}
          numberOfLines={2}
          style={styles.list_item_font}
          >{this.props.news[i]}</Text>
      );
      news.push(text);
    }
    return (
      <View style={styles.list_item}>
        {news}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
    backgroundColor: '#F5FCFF'
  },
  plate: {
    height: 85*3,
    marginVertical: 10,
    marginHorizontal: 5,
    overflow: 'hidden',
    overflow: 'hidden',
    borderRadius: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    height: 84,
    marginBottom: 2,
  },
  item: {
    flex: 1,
    height: 84,
    marginVertical: 0,
    marginHorizontal: 1/PixelRatio.get(),
  },
  itemColor01: {
    backgroundColor: '#ff4e63'
  },
  itemColor02: {
    backgroundColor: '#4b8fed'
  },
  itemColor03: {
    backgroundColor: '#34c2aa'
  },
  ite: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1/PixelRatio.get(),
    borderColor: '#FFF',
    
  },
  font: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  list_item: {

  },
  list_item_font: {

  }
});
