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
let Demensions = require('Dimensions');
let { width, height } = Demensions.get('window');
const TopHeight = Platform.select({
    ios: 20,
    android: 0,
});
const OffsetHeader = Platform.select({
    ios: 0,
    android: 15,
});

//定义列表
export default class ListPage extends Component {

    static navigationOptions = {
        header: () => null
    };

    setModalInfoVisible(visible) {
        this.setState({ modalInfoVisible: visible });
    }

    render() {
        return (
            <View style={[styles.flex, { backgroundColor: '#FFF' }]}>
                <View style={styles.header}>
                    <View style={styles.h_nav}>
                        <TouchableOpacity style={styles.h_n_btn} activeOpacity={0.7} onPress={() => (this.props.navigation.goBack())} >
                            <Image style={{ width: 48, height: 48 }} source={require("../assets/images/icon_back.png")} />
                        </TouchableOpacity>
                        <View style={styles.h_title}>
                            <Text style={styles.h_t_text}>列表</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        paddingTop: TopHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'relative'
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
        height: height - (48 + TopHeight) + OffsetHeader,
        position: 'absolute',
        top: 48 + TopHeight,
        backgroundColor: '#fff',
        width: width
    },
    b_list: {
        // backgroundColor: '#fff',
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
    modal_hred: {
        width: width,
        position: 'absolute',
        top: TopHeight,
        zIndex: 1,
        backgroundColor: '#fff',
        height: 48
    },
    modal_info_back: {
        width: 48,
        height: 48
    },
    modal_body: {
        position: 'absolute',
        top: 48 + TopHeight,
        width: width,
        height: height - (48 + TopHeight)
    },
    modal_title: {
        fontSize: 18,
        textAlign: 'center',
        paddingVertical: 30,
    },
    modal_summary: {
        fontSize: 14,
        lineHeight: 22,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    modal_text: {
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 10,
        textAlign: 'justify',
        lineHeight: 22,
        color: '#545454'
    }
});
