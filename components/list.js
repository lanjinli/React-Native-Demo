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
    StatusBar
} from 'react-native';
import { hidden } from 'ansi-colors';
import NavigationBar from '../utils/NavigationBar';
import {width, height, Demensions, STATUS_BAR_HEIGHT, NAVBSR_HEIGHT} from '../utils/util';

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
                <NavigationBar
                    title={'列表'}
                    style={{
                        backgroundColor: '#fff'
                    }}
                    leftButton={
                        <TouchableOpacity style={[styles.NavBarBtn]} activeOpacity={0.7} onPress={() => (this.props.navigation.goBack())} >
                            <Image style={{ width: 44, height: 44 }} source={require("../assets/images/icon_back.png")} />
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative'
    },
    NavBarBtn: {
        width: 44,
        height: NAVBSR_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        height: height - (NAVBSR_HEIGHT + STATUS_BAR_HEIGHT),
        position: 'absolute',
        top: 48 + STATUS_BAR_HEIGHT,
        backgroundColor: '#fff',
        width: width
    },
    b_list: {
        // backgroundColor: '#fff',
        flex: 1,
        minHeight: height - (84 + NAVBSR_HEIGHT + STATUS_BAR_HEIGHT),
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
        top: STATUS_BAR_HEIGHT,
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
        top: 48 + STATUS_BAR_HEIGHT,
        width: width,
        height: height - (48 + STATUS_BAR_HEIGHT)
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
