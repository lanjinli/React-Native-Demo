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
import {HomeData} from '../utils/config';

export default class Aside extends Component {

    state = {
        homeList: HomeData
    };

    //关闭侧栏抽屉
    pressCloseDrawer() {
        this.props.navigation.closeDrawer();
    };

    render() {
        return (
            <View style={[styles.flex, { backgroundColor: '#fff' }]}>
                <View style={styles.logo_wrap}>
                    <Image source={require("../assets/images/logo.png")} style={styles.logo} />
                </View>
                <ScrollView>
                    <View style={styles.list}>
                        {
                            this.state.homeList.map((item, index) => {
                                return (
                                <TouchableOpacity
                                    style={styles.btn}
                                    activeOpacity={0.1}
                                    key={index}
                                    onPress={() => this.props.navigation.navigate('List')}
                                >
                                    <Text style={styles.text}>{item.title}</Text>
                                </TouchableOpacity>)
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    flex: {
        paddingTop: STATUS_BAR_HEIGHT,
        flex: 1,
        backgroundColor: '#fff'
    },
    logo_wrap: {
        width: '100%',
        height: 160,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 72,
        height: 72,
    },
    list: {
        flex: 1,
        backgroundColor: '#f9f9f9'
    },
    btn: {
        height: 50,
        width: '100%',
        backgroundColor: '#f9f9f9'
    },
    text: {
        lineHeight: 50,
        fontSize: 16,
        fontWeight: '100',
        paddingHorizontal: 10,
        textAlign: 'center'
    }
});
