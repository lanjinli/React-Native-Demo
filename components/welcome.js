
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    PixelRatio,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity
} from 'react-native';
import { hidden } from 'ansi-colors';
let Demensions = require('Dimensions');
let { width, height } = Demensions.get('window');
const TopHeight = Platform.select({
    ios: 20,
    android: 0,
});


//定义广告页
export default class Welcome extends Component {

    //跳转首页
    getHomePage() {
        this.props.navigation.replace('HomeDrawerNav');
    }
    static navigationOptions = {
        // 隐藏头部
        header: () => null
    };

    constructor(props) {
        super(props);
        this.state = {
            countdown: 3
        }
    }

    componentDidMount() {
        // 3秒后跳转到Home
        this.timer = setInterval(() => {
            if (this.state.countdown <= 0) {
                this.getHomePage();
            } else {
                this.setState({
                    countdown: this.state.countdown - 1
                })
            }
        }, 1000);
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }
    
    render() {
        return (
            <View style={[styles.flex]}>
                {/* <StatusBar
                    animated={true}//变化是否动画过渡
                    hidden={true}//是否显示
                    backgroundColor={'#000'}//背景颜色
                    translucent={true}//状态栏是否透明
                    networkActivityIndicatorVisible={false}//ios 状态加载中
                    showHideTransition={'fade'}
                    barStyle={'dark-content'} // 文本颜色
                >
                </StatusBar> */}
                <Image source={require("../assets/images/home_ads.jpg")} style={styles.adsImg}/>
                <View style={styles.slogan}>
                    <Text style={styles.slogan_text}>腾讯AI黑科技 一键可达</Text>
                </View>
                <TouchableOpacity style={[styles.skip]} onPress={this.getHomePage.bind(this)}>
                    <Text style={styles.skip_text}>{this.state.countdown}</Text>
                    <Text style={styles.skip_text}> | </Text>
                    <Text style={styles.skip_text}>跳过</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    adsImg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: width,
        height: null,
        resizeMode: 'cover'
    },
    slogan: {
        width: width,
        height: width/4,
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slogan_text: {
        fontSize: 16,
        // color: '#fff',
        color: '#666',
    },
    skip: {
        position: 'absolute',
        top: 10 + TopHeight,
        right: 10,
        width: 80,
        height: 28,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 14,
    },
    skip_text: {
        color: '#FFF',
        fontSize: 14,
    }
});