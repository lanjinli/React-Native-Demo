import React from 'react';
import {
    Platform,
    PixelRatio,
    NativeModules
} from 'react-native';
import Toast from 'react-native-root-toast';

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

let toast;
export const toastUtil = (content, time = 'SHORT') => {
    if (toast !== undefined) {
      Toast.hide(toast);
    }
    toast = Toast.show(content.toString(), {
        duration: Toast.durations[time],
        position: Toast.positions.BOTTOM,
        animation: true,
        shadow: false,
        backgroundColor: 'rgba(0,0,0,.8)',
        hideOnPress: true,
        delay: 0,
        opacity: 1,
        containerStyle: {
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 3,
        },
        textStyle: {
            fontSize: 14,
            lineHeight: 18,
        },
    });
};