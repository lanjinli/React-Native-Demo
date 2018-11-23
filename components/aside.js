import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    PixelRatio,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { hidden } from 'ansi-colors';
import {width, height, Demensions, STATUS_BAR_HEIGHT, NAVBSR_HEIGHT} from '../utils/util';


export default class Aside extends Component {
    //关闭侧栏抽屉
    pressCloseDrawer() {
        this.props.navigation.closeDrawer();
    };
    render() {
        return (
            <View style={[styles.flex, { backgroundColor: '#fff' }]}>
                <TouchableOpacity style={[styles.btn]} onPress={this.pressCloseDrawer.bind(this)}>
                    <Text>点击关闭侧栏抽屉</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    flex: {
        paddingTop: STATUS_BAR_HEIGHT,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'relative'
    }
});
