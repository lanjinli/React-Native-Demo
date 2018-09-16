import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    PixelRatio,
    Text,
    View,
    Button,
    TouchableOpacity
} from 'react-native';
import { hidden } from 'ansi-colors';
import { TabNavigator } from 'react-navigation';


//定义首页
class FirstPage extends Component {
    //点击进入下一页
    pressPush () {
        this.props.navigation.navigate('Secon');
    };
    render() {
        return (
            <View style={[styles.flex, {backgroundColor: 'yellow'}]}>
                <TouchableOpacity style={[styles.btn]} onPress={this.pressPush.bind(this)}>
                    <Text>点击推出下一页面</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

//定义下一页
class SeconPage extends Component {
    //点击返回上一页
    pressPop() {
        this.props.navigation.navigate('First');
    };
    render() {
        return (
            <View style={[styles.flex, { backgroundColor: 'cyan' }]}>
                <TouchableOpacity style={[styles.btn]} onPress={this.pressPop.bind(this)}>
                    <Text>点击返回一页面</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default TabNavigator(
    {
        First: {
            screen: FirstPage,
        },
        Secon: {
            screen: SeconPage
        },
    },
    {
        animationEnabled: true, // 切换页面时不显示动画
    }
);

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: 150,
        height: 30,
        borderColor: '#0089FF',
        borderWidth: 1,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
