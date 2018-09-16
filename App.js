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
import LessonNavigator from './drawer_navigation.js';

export default class App extends Component {
  render() {
    return (
      <LessonNavigator></LessonNavigator>
    );
  }
}