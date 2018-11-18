import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
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
    BVLinearGraient,
    Modal
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

    state = {
        modalInfoVisible: false
    };

    setModalInfoVisible(visible) {
        this.setState({ modalInfoVisible: visible });
    }

    render() {
        return (
            <View style={[styles.flex, { backgroundColor: '#FFF' }]}>
                <View style={styles.header}>
                    <View style={styles.h_nav}>
                        <TouchableOpacity style={styles.h_n_btn} activeOpacity={0.7}>
                            <Image style={{ width: 48, height: 48 }} source={require("../assets/images/icon_menu.png")} />
                        </TouchableOpacity>
                        <View style={styles.h_title}>
                            <Text style={styles.h_t_text}>腾讯AI体验中心</Text>
                        </View>
                        <TouchableOpacity style={styles.h_n_btn} activeOpacity={0.7} onPress={() => {this.setModalInfoVisible(!this.state.modalInfoVisible)}}>
                            <Image style={{ width: 48, height: 48 }} source={require("../assets/images/icon_about.png")} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.body}>
                    <View style={styles.b_list}>
                        <TouchableOpacity
                            style={styles.b_l_btn}
                            activeOpacity={0.9}
                        >
                            <LinearGradient start={{ x: 0.25, y: 0.25 }} end={{ x: 0.75, y: 0.75 }} colors={['#0079f4', '#1b4fd5']} style={styles.b_l_t_bg}>
                                <Image source={require("../assets/images/home_icon_01.png")} style={styles.b_l_btn_icon} />
                                <Text style={styles.b_l_btn_text}>计算机视觉</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.b_l_btn}
                            activeOpacity={0.9}
                        >
                            <LinearGradient start={{ x: 0.25, y: 0.25 }} end={{ x: 0.75, y: 0.75 }} colors={['#0079f4', '#1b4fd5']} style={styles.b_l_t_bg}>
                                <Image source={require("../assets/images/home_icon_02.png")} style={styles.b_l_btn_icon} />
                                <Text style={styles.b_l_btn_text}>自然语言处理</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.b_l_btn}
                            activeOpacity={0.9}
                        >
                            <LinearGradient start={{ x: 0.25, y: 0.25 }} end={{ x: 0.75, y: 0.75 }} colors={['#0079f4', '#1b4fd5']} style={styles.b_l_t_bg}>
                                <Image source={require("../assets/images/home_icon_03.png")} style={styles.b_l_btn_icon} />
                                <Text style={styles.b_l_btn_text}>智能语音交互</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.b_l_btn}
                            activeOpacity={0.9}
                        >
                            <LinearGradient start={{ x: 0.25, y: 0.25 }} end={{ x: 0.75, y: 0.75 }} colors={['#0079f4', '#1b4fd5']} style={styles.b_l_t_bg}>
                                <Image source={require("../assets/images/home_icon_04.png")} style={styles.b_l_btn_icon} />
                                <Text style={styles.b_l_btn_text}>底层硬件通讯</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.b_foot}>
                        <Text style={styles.b_f_text}>腾讯AI开放平台</Text>
                    </View>
                </ScrollView>
                <Modal
                    style={styles.modal_info}
                    animationType='fade'
                    transparent={true}
                    visible={this.state.modalInfoVisible}
                    onRequestClose={() => { this.setModalInfoVisible(!this.state.modalInfoVisible) }}
                >
                    <View style={[styles.flex, { justifyContent: 'space-around', backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
                        <View style={styles.modal_body}>
                            <Text style={styles.h_t_text}>描述信息</Text>
                        </View>
                        <TouchableOpacity style={styles.h_n_btn} activeOpacity={0.7} onPress={() => {this.setModalInfoVisible(!this.state.modalInfoVisible)}}>
                            <Image style={{ width: 48, height: 48 }} source={require("../assets/images/icon_down.png")} />
                        </TouchableOpacity>
                    </View>
                </Modal>
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
    },
    h_title: {
        height: 48,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    h_t_text: {
        color: '#1d1d1d',
        fontSize: 18,
    },
    body: {
        height: height - (48 + TopHeight),
        position: 'absolute',
        top: 48 + TopHeight,
        // height: height - TopHeight,
        backgroundColor: '#fff',
        width: width
    },
    b_list: {
        backgroundColor: '#fff',
        flex: 1,
        minHeight: height - (92 + TopHeight),
    },
    b_l_btn: {
        marginHorizontal: 10,
        marginVertical: 6,
        borderRadius: 3,
        overflow: 'hidden'
    },
    b_l_t_bg: {
        height: 150,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    b_l_btn_icon: {
        flex: 0,
        width: 160,
        height: 101,
        marginLeft: 20
    },
    b_l_btn_text: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginRight: 20
    },
    b_foot: {
        height: 34,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    b_f_text: {
        fontSize: 12,
        color: '#bdbdbd',
    },
    modal_body: {
        width: width - 60,
        height: height - (height/4),
        backgroundColor: '#fff',
        borderRadius: 3,
        marginTop: 30
    }
});
