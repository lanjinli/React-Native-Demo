import React from 'react';
import {
    Platform,
    PixelRatio,
    NativeModules
} from 'react-native';

export const Demensions = require('Dimensions');
export const { width, height } = Demensions.get('window');
const { StatusBarManager } = NativeModules;
export const STATUS_BAR_HEIGHT = Platform.select({
    ios: 20,
    android: StatusBarManager.HEIGHT
});
export const NAVBSR_HEIGHT = Platform.select({
    ios: 44,
    android: 50,
});