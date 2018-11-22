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
  View,
} from 'react-native';
import { hidden } from 'ansi-colors';
// import Welcome from './components/welcome';
import { AppStackNavigator } from './navigators/AppNavigators';

export default class App extends Component {
  render() {
    return (
      <AppStackNavigator></AppStackNavigator>
    );
  }
}