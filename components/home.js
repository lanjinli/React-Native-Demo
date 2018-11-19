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
const OffsetHeader = Platform.select({
    ios: 0,
    android: 15,
});

//定义首页
class HomePage extends Component {

    static navigationOptions = {
        header: () => null
    };

    state = {
        homeList: [
            {
                img: require('../assets/images/home_icon_01.png'),
                title: '计算机视觉',
                summary: '',
                page: ''
            },
            {
                img: require('../assets/images/home_icon_02.png'),
                title: '自然语言处理',
                summary: '',
                page: ''
            },
            {
                img: require('../assets/images/home_icon_03.png'),
                title: '智能语音交互',
                summary: '',
                page: ''
            },
            {
                img: require('../assets/images/home_icon_04.png'),
                title: '底层硬件通讯',
                summary: '',
                page: ''
            }
        ],
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
                        <TouchableOpacity style={styles.h_n_btn} activeOpacity={0.7} onPress={() => (this.props.navigation.openDrawer())} >
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
                        {
                            this.state.homeList.map((item, index) => {
                                return (<TouchableOpacity
                                    style={styles.b_l_btn}
                                    activeOpacity={0.9}
                                    key={index}
                                >
                                    <LinearGradient start={{ x: 0.25, y: 0.25 }} end={{ x: 0.75, y: 0.75 }} colors={['#0079f4', '#1b4fd5']} style={styles.b_l_t_bg}>
                                        <Image source={item.img} style={styles.b_l_btn_icon} />
                                        <Text style={styles.b_l_btn_text}>{item.title}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>);
                            })
                        }
                    </View>
                    <View style={styles.b_foot}>
                        <Text style={styles.b_f_text}>腾讯AI开放平台</Text>
                    </View>
                </ScrollView>
                <Modal
                    style={styles.modal_info}
                    animationType='slide'
                    transparent={false}
                    visible={this.state.modalInfoVisible}
                    onRequestClose={() => { this.setModalInfoVisible(!this.state.modalInfoVisible) }}
                >
                    <View style={styles.modal_hred}>
                        <TouchableOpacity style={styles.modal_info_back} activeOpacity={0.7} onPress={() => { this.setModalInfoVisible(!this.state.modalInfoVisible) }}>
                            <Image tintColor={'#808080'} style={{ width: 48, height: 48 }} source={require("../assets/images/icon_back.png")} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.modal_body}>
                        <Text style={styles.modal_title}>腾讯三大AI实验室  强大的技术基石</Text>
                        <Text style={styles.modal_summary}>AI LAB</Text>
                        <Text style={styles.modal_text}>腾讯AI Lab聚集全球数十位人工智能科学家、70位世界一流AI博士，专注机器学习、计算机视觉、语音识别、自然语言处理等人工智能领域的研究。</Text>
                        <Text style={styles.modal_summary}>优图实验室</Text>
                        <Text style={styles.modal_text}>优图实验室致力于人脸识别、图像识别及声音识别的技术研究和产品研发，拥有业界独创的活体检测技术，已为上百家企业提供服务。</Text>
                        <Text style={styles.modal_summary}>微信AI</Text>
                        <Text style={styles.modal_text}>微信AI致力于为语音识别、自然语言处理、计算机视觉、数据挖掘和机器学习等人工智能技术的发展带来革命性进步。</Text>
                    </ScrollView>
                </Modal>
            </View>
        );
    }
}

// export default StackNavigator(
//     {
//         Home: {
//             screen: HomePage,
//         }
//     },
//     {
//         initialRouteName: 'Home',
//         navigationOptions: {
//             header: () => null
//         },
//         mode: 'card',
//         headerMode: 'screen'
//     }
// );

// 定义下一页
// class SeconPage extends Component {
//     static navigationOptions = {
//         title: '通知',
//         drawerLabel: '通知',
//     };
//     //点击返回上一页
//     pressPop() {
//         this.props.navigation.navigate('Home');
//     };
//     render() {
//         return (
//             <View style={[styles.flex, { backgroundColor: 'cyan' }]}>
//                 <TouchableOpacity style={[styles.btn]} onPress={this.pressPop.bind(this)}>
//                     <Text>点击返回一页面</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }

export default DrawerNavigator(
    {
        Home: {
            screen: HomePage,
        }
    },
    {
        drawerWidth: 220, // 抽屉宽
        drawerPosition: 'left', // 抽屉在左边还是右边
        // contentComponent: CustomDrawerContentComponent,  // 自定义抽屉组件
        contentOptions: {
            initialRouteName: HomePage, // 默认页面组件
            activeTintColor: '#008AC9',  // 选中文字颜色
            activeBackgroundColor: '#f5f5f5', // 选中背景颜色
            inactiveTintColor: '#000',  // 未选中文字颜色
            inactiveBackgroundColor: '#fff', // 未选中背景颜色
            style: {}
        }
    }
);

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
