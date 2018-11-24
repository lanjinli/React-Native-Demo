import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    PixelRatio,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    ScrollView,
} from 'react-native';
import { hidden } from 'ansi-colors';
import NavigationBar from '../../utils/NavigationBar';
import {width, height, Demensions, STATUS_BAR_HEIGHT, NAVBSR_HEIGHT} from '../../utils/util';

//定义详情
export default class OcrHandwritingocr extends Component {

    static navigationOptions = {
        header: () => null
    };

    state = {
    };

    render() {
        const { data } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.flex}>
                <NavigationBar
                    title={data.title}
                    style={{
                        backgroundColor: '#fff'
                    }}
                    leftButton={
                        <TouchableOpacity style={[styles.NavBarBtn]} activeOpacity={0.7} onPress={() => this.props.navigation.goBack()} >
                            <Image style={{ width: 44, height: 44 }} source={require("../../assets/images/icon_back.png")} />
                        </TouchableOpacity>
                    }
                />
                <ScrollView>
                    <View style={styles.viewport}></View>
                    <View style={styles.results}></View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.btn_wrap}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.btn_text}>上传图像</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
    viewport: {
        width: width,
        height: width,
        backgroundColor: '#f5f6f6'
    },
    results: {

    },
    button: {
        marginHorizontal: 10,
        marginVertical: 20,
    },
    btn_wrap: {
        height: 44,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        backgroundColor: '#1657da'
    },
    btn_text: {
        fontSize: 18,
        color: '#fff'
    }
});
