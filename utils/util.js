import React from 'react';
import {
    Platform,
    PixelRatio,
    NativeModules
} from 'react-native';

export const Demensions = require('Dimensions');
export const { width, height } = Demensions.get('window');

const X_WIDTH = 375;
const X_HEIGHT = 812;
const { StatusBarManager } = NativeModules;

export function isIphoneX() {
    return (
        Platform.OS === 'ios' && ((height === X_HEIGHT && width === X_WIDTH) || (height === X_WIDTH && width === X_HEIGHT))
    )
}

export function ifIphoneX (iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    } else {  
        return regularStyle;
    }
}

export const STATUS_BAR_HEIGHT = Platform.select({
    ios: ifIphoneX(44,20),
    android: StatusBarManager.HEIGHT
});
export const NAVBSR_HEIGHT = Platform.select({
    ios: 44,
    android: 50,
});