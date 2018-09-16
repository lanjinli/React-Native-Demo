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
import { DrawerNavigator } from 'react-navigation';


//定义首页
class FirstPage extends Component {
    static navigationOptions = {
        title: '首页',
        drawerLabel: '首页',
    };
    //点击进入下一页
    pressPush () {
        this.props.navigation.openDrawer();
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
    static navigationOptions = {
        title: '通知',
        drawerLabel: '通知',
    };
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

export default DrawerNavigator(
    {
        First: {
            screen: FirstPage,
        },
        Secon: {
            screen: SeconPage
        },
    },
    {
        drawerWidth: 220, // 抽屉宽
        drawerPosition: 'left', // 抽屉在左边还是右边
        // contentComponent: CustomDrawerContentComponent,  // 自定义抽屉组件
        contentOptions: {
            initialRouteName: FirstPage, // 默认页面组件
            activeTintColor: '#008AC9',  // 选中文字颜色
            activeBackgroundColor: '#f5f5f5', // 选中背景颜色
            inactiveTintColor: '#000',  // 未选中文字颜色
            inactiveBackgroundColor: '#fff', // 未选中背景颜色
            style: {  // 样式

            }
        }
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
