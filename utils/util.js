import React from 'react';
import {
    Platform,
    PixelRatio,
    NativeModules
} from 'react-native';
// import ExtraDimensions from 'react-native-extra-dimensions-android';

export const Demensions = require('Dimensions');
export const { width, height, scale } = Demensions.get('screen');

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

// export const {
//     REAL_WINDOW_HEIGHT,
//     REAL_WINDOW_WIDTH,
//     STATUS_BAR_HEIGHT,
//     SOFT_MENU_BAR_HEIGHT,
//     SMART_BAR_HEIGHT
// } = [
//     ExtraDimensions.get('REAL_WINDOW_HEIGHT'),
//     ExtraDimensions.get('REAL_WINDOW_WIDTH'),
//     ExtraDimensions.get('STATUS_BAR_HEIGHT'),
//     ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT'),
//     ExtraDimensions.get('SMART_BAR_HEIGHT'),
// ]

// export const REAL_WINDOW_HEIGHT = ExtraDimensions.get('REAL_WINDOW_HEIGHT');
// console.log(REAL_WINDOW_HEIGHT)