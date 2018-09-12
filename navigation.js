import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    PixelRatio,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { hidden } from 'ansi-colors';
import {
    Navigator
} from 'react-navigation';


//定义首页
class FirstPage extends Component {
    //点击进入下一页
    pressPush () {
        let nextRoute = {
            component: SeconPage
        }
        this.props.navigator.push(nextRoute);
    };
    render() {
        return (
            <View style={[styles.flex, {backgroundColor: 'yellow'}]}>
                <TouchableOpacity style={[styles.btn]} onPress={this.pressPush}>
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
        this.props.navigator.pop();
    };
    render() {
        return (
            <View style={[styles.flex, { backgroundColor: 'cyan' }]}>
                <TouchableOpacity style={[styles.btn]} onPress={this.pressPop}>
                    <Text>点击返回一页面</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


export default class LessonNavigator extends Component {
    render() {
        let rootRoute = {
            component: FirstPage
        };
        return (
            <Navigator
                /*
                第一步
                initialRoute
                这个指定默认页面
                对象的属性是自定的，对象的内容会在renderScene方法中处理
                备注：必须包含的属性
                */
                initialRoute={rootRoute}
                /*
                第二步
                configureScene
                场景渲染的设置 动画
                */
                configureScene={(route) => {
                    return Navigator.SceneConfigs.PushFromRight;
                }}
                /*
                第三步
                renderScene
                渲染场景
                参数： route(第一步创建并设置给导航器的路由对象)
                */
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return (
                        <Component
                            navigator={navigator}
                            route={route}
                        />
                    )
                }}
            />
        );
    }
}

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
