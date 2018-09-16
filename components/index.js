
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    PixelRatio,
    Text,
    View,
    StatusBar,
    Image
} from 'react-native';
import { hidden } from 'ansi-colors';
import HomePage from './home';
import { StackNavigator } from 'react-navigation';
let Demensions = require('Dimensions');
let { width, height } = Demensions.get('window');

//定义广告页
class AdsPage extends Component {
    //点击跳转
    clickPush() {
        alert('跳转');
    };
    //跳转
    getPage() {
        this.props.navigation.navigate('Secon', { title: '首页传递的值' });
    }
    static navigationOptions = {
        // 隐藏头部
        header: () => null
    };
    render() {
        return (
            <View style={[styles.flex]}>
                <StatusBar
                    animated={true}//变化是否动画过渡
                    hidden={true}//是否显示
                    backgroundColor={'#000'}//背景颜色
                    translucent={true}//状态栏是否透明
                    networkActivityIndicatorVisible={false}//ios 状态加载中
                    showHideTransition={'fade'}
                    barStyle={'dark-content'} // 文本颜色
                >
                </StatusBar>
                <Image source={require("../assets/images/home_ads.jpg")} style={styles.adsImg}/>
                <View style={styles.slogan}>
                    <Text style={styles.slogan_text}>简单的事变得简单，艰难的事变得可能</Text>
                </View>
            </View>
        );
    }
}

export default StackNavigator(
    {
        Ads: AdsPage,
        Home: HomePage,
    },
    {
        initialRouteName: 'Ads',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#0b56b1',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            gesturesEnabled: true,
        },
        mode: 'card',
        headerMode: 'screen'
    }
);

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    adsImg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: null,
        resizeMode: 'cover',
    },
    btn: {
        width: 150,
        height: 30,
        borderColor: '#0089FF',
        borderWidth: 1,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slogan: {
        width: width,
        height: height/5,
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slogan_text: {
        fontSize: 14,
        color: '#969696',
    }
});