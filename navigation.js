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
import { StackNavigator } from 'react-navigation';


//定义首页
class FirstPage extends Component {
    //点击进入下一页
    pressPush () {
        this.props.navigation.navigate('Secon', { title: '首页传递的值' });
    };
    static navigationOptions = {
        // 隐藏头部
        header: () => null
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
        this.props.navigation.goBack();
    };
    //标题设置
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerRight: (
            <Button
                onPress={() => alert('This is a button Right!')}
                title="Right"
                color="#fff"
            />
        ),
        headerLeft: (
            <Button
                onPress={() => alert('This is a button Left!')}
                title="Left"
                color="#fff"
            />
        )
    });
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

export default StackNavigator(
    {
        First: FirstPage,
        Secon: SeconPage,
    },
    {
        initialRouteName: 'First',
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
