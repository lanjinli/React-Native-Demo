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
import { StackNavigator, DrawerNavigator } from 'react-navigation';
let Demensions = require('Dimensions');
let { width, height } = Demensions.get('window');
const TopHeight = Platform.select({
    ios: 20,
    android: 0,
});

//定义首页
class HomePage extends Component {

    static navigationOptions = {
        header: () => null
    };

    render() {
        return (
            <View style={[styles.flex, { backgroundColor: '#FFF' }]}>
                <View style={styles.header}>
                    <View style={styles.h_nav}>
                        <TouchableOpacity style={styles.h_n_btn}><Text>左</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.h_n_btn}><Text>右</Text></TouchableOpacity>
                    </View>
                    <View style={styles.h_title}>
                        <Text style={styles.h_t_text}>Experience Centre</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.b_title}>
                    </View>
                </View>
            </View>
        );
    }
}

export default StackNavigator(
    {
        Home: {
            screen: HomePage,
        }
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            header: () => null
        },
        mode: 'card',
        headerMode: 'screen'
    }
);

const styles = StyleSheet.create({
    flex: {
        paddingTop: TopHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        width: width,
        backgroundColor: '#fff',
        position: 'absolute',
        top: TopHeight,
    },
    h_nav: {
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    h_n_btn: {
        width: 48,
        height: 48,
        backgroundColor: '#ccc',
    },
    h_title: {
        height: 66,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    h_t_text: {
        color: '#1d1d1d',
        fontSize: 22,
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        position: 'absolute',
        top: 48 + TopHeight,
    }

});
