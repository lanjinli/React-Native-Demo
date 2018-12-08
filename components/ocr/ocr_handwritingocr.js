import ImagePicker from 'react-native-image-picker';
import Toast, {DURATION} from 'react-native-easy-toast';

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
import HttpUtils from '../../utils/httpUtils';
import formatJson from '../../utils/formatJson';

//定义详情
export default class OcrHandwritingocr extends Component {

    static navigationOptions = {
        header: () => null
    };

    state = {
        base64: null,
        avatarSource: null,
        videoSource: null,
        viewport_img: {
            width: 0,
            height: 0,
        },
        resultData: null,
    };

    componentDidMount() {
    }

    // 选择图片
    selectPhotoTapped() {
        const options = {
            title: '', 
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照', 
            chooseFromLibraryButtonTitle: '选择照片', 
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high', 
            durationLimit: 10, 
            // maxWidth: 300,
            // maxHeight: 300,
            quality: 1, 
            angle: 0,
            allowsEditing: false, 
            noData: false,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                // this.refs.toast.show('取消图像选择');
            }
            else if (response.error) {
                this.refs.toast.show('选择图像出错', response.error);
            }
            else {
                this.setState({
                    resultData: null
                });
                // let source = { uri: response.uri };
                // You can also display the image using data:
                // this.requestApi(response.data);
                let source = { uri: 'data:image/jpeg;base64,' + response.data };
                let imgWidth,imgHeight;
                if(response.width > response.height){
                    imgWidth = width;
                    imgHeight = response.height/(response.width/width);
                }else if(response.width < response.height){
                    imgWidth = response.width/(response.height/width);
                    imgHeight = width;
                }else{
                    imgWidth = width;
                    imgHeight = width;
                }
                this.setState({
                    base64: response.data,
                    avatarSource: source,
                    viewport_img: {
                        width: imgWidth,
                        height: imgHeight,
                    }
                });
            }
        });
    }

    // 请求接口
    requestApi() {

        if(!this.state.base64){
            this.refs.toast.show('请先选择图像');
            return
        }

        let data = {
            "app_id": "2109841751",
            "time_stamp": Math.round(new Date().getTime()/1000).toString(),
            "nonce_str": Math.floor(Math.random()*100000).toString(),
            "sign": "",
            "image": this.state.base64,
            "image_url": "",
        }
        HttpUtils.post('http://web.lilanjin.top/sign.php',{
            'url': 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_handwritingocr',
            'params': data
        })
        .then(result=>{
            console.log(result);
            this.setState({
                resultData: result
            });
        })
        .catch(error=>{
            console.log(error);
        })
    }

    // 输出结果
    outputResults() {
    }

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
                        <TouchableOpacity style={[styles.NavBarBtn]} activeOpacity={0.6} onPress={() => this.props.navigation.goBack()} >
                            <Image style={{ width: 44, height: 44 }} source={require("../../assets/images/icon_back.png")} />
                        </TouchableOpacity>
                    }
                />
                <ScrollView>
                    <View style={styles.viewport}>
                        <Image style={this.state.viewport_img} source={this.state.avatarSource} />
                        <TouchableOpacity
                            style={styles.choice_btn}
                            activeOpacity={0.9}
                            onPress={this.selectPhotoTapped.bind(this)}
                        >
                            <Image style={{ width: 26, height: 26, tintColor: '#fff' }} source={require("../../assets/images/icon_photo.png")} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.btn_wrap}
                            activeOpacity={0.9}
                            onPress={this.requestApi.bind(this)}
                        >
                            <Text style={styles.btn_text}>开始识别</Text>
                        </TouchableOpacity>
                    </View>
                        {
                            this.state.resultData && this.state.resultData.ret == 0 ? (
                                <View style={styles.results}>
                                    <View style={styles.TextView}>
                                    {
                                        this.state.resultData.data.item_list.map((item, index) => {
                                            return (<Text style={styles.results_text} key={index}>{index+1}：{item.itemstring}</Text>);
                                        })
                                    }
                                    </View>
                                    <View style={styles.PreView}>
                                        <Text style={styles.results_pre}>{this.state.resultData && formatJson(this.state.resultData)}</Text>
                                    </View>
                                </View>
                            ):(
                                <View style={styles.results}>
                                    <Text style={styles.results_err_text}>
                                        {this.state.resultData && this.state.resultData.msg}
                                        &nbsp;&nbsp;
                                        {this.state.resultData && 'code:'+this.state.resultData.ret}
                                    </Text>
                                </View>
                            )
                        }
                </ScrollView>
                <Toast
                    ref="toast"
                    style={styles.toast}
                    position='bottom'
                    positionValue={30}
                    fadeInDuration={200}
                    fadeOutDuration={100}
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
    toast: {
        backgroundColor: 'rgba(0,0,0,.7)',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 6
    },
    viewport: {
        width: width,
        height: width,
        backgroundColor: '#f5f6f6',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    choice_btn: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 38,
        width: 38,
        backgroundColor: 'rgba(0,0,0,.3)',
        borderRadius: 24,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    results: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    TextView: {
        backgroundColor: '#ebecec',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    PreView: {
        backgroundColor: '#fff',
        paddingVertical: 10,
    },
    results_text: {
        fontSize: 14,
        paddingVertical: 2,
        lineHeight: 24,
    },
    results_pre: {
        fontSize: 14,
        paddingVertical: 3,
        lineHeight: 20,
    },
    results_err_text: {
        fontSize: 14,
        paddingHorizontal: 6,
        lineHeight: 28,
        textAlign: 'center',
    },
    button: {
        marginHorizontal: 10,
        marginTop: 30,
        marginBottom: 20,
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
