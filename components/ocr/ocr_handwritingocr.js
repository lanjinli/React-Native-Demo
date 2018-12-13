import ImagePicker from 'react-native-image-picker';
import Toast, {DURATION} from 'react-native-easy-toast';
import * as Animatable from 'react-native-animatable';

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
    ActivityIndicator
} from 'react-native';
import { hidden } from 'ansi-colors';
import NavigationBar from '../../utils/NavigationBar';
import {width, height, scale, Demensions, STATUS_BAR_HEIGHT, NAVBSR_HEIGHT} from '../../utils/util';
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
        readImg: false,
        requestStatus: false
    };

    componentDidMount() {
    }

    // 选择图片
    selectPhotoTapped(type) {

        if(this.state.readImg){return}

        this.setState({
            readImg: true,
        });

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

        // showImagePicker 相册与拍照
        // launchImageLibrary 相册
        // launchCamera 拍照
        ImagePicker[type](options, (response) => {
            this.setState({
                readImg: false,
            });
            if (response.didCancel) {
                // this.refs.toast.show('取消图像选择');
            } else if (response.error) {
                this.refs.toast.show('选择图像出错', response.error);
            } else {
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

        if(this.state.requestStatus)return

        if(!this.state.base64){
            this.refs.toast.show('请先选择图像');
            return
        }

        this.setState({
            requestStatus: true
        });

        let data = {
            "app_id": "2109841751",
            "time_stamp": Math.round(new Date().getTime()/1000).toString(),
            "nonce_str": Math.floor(Math.random()*100000).toString(),
            "sign": "",
            "image": this.state.base64,
            "image_url": "",
        }
        console.log('load');
        HttpUtils.post('http://web.lilanjin.top/sign.php',{
            'url': 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_handwritingocr',
            'params': data
        })
        .then(result=>{
            console.log(result);
            this.setState({
                resultData: result,
                requestStatus: false
            });
        })
        .catch(error=>{
            console.log(error);
            this.setState({
                requestStatus: false
            });
        })
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
                        <Image style={this.state.viewport_img} source={this.state.avatarSource} onLoad={()=>{this.setState({readImg: false})}}/>
                        {this.state.readImg && <ActivityIndicator
                            style={styles.imgLoad}
                            color='#abacac'
                            animating={this.state.readImg}
                            size="small"
                        />}
                        <View style={styles.choice_wrap}>
                            <Animatable.View style={{marginTop: 10, height: 38, width: 38}} animation="zoomIn" duration={1000} easing="ease-out" iterationCount={1}>
                                <TouchableOpacity
                                    style={[styles.choice_btn]}
                                    activeOpacity={0.8}
                                    onPress={() => {this.selectPhotoTapped('launchCamera')}}
                                >
                                        <Image style={{ width: 26, height: 26, tintColor: '#fff' }} source={require("../../assets/images/icon_camera.png")} />
                                </TouchableOpacity>
                            </Animatable.View>
                            <Animatable.View style={{marginTop: 10, height: 38, width: 38}} animation="zoomIn" duration={1000} easing="ease-out" iterationCount={1}>
                                <TouchableOpacity
                                    style={styles.choice_btn}
                                    activeOpacity={0.8}
                                    onPress={() => {this.selectPhotoTapped('launchImageLibrary')}}
                                >
                                    <Image style={{ width: 26, height: 26, tintColor: '#fff' }} source={require("../../assets/images/icon_photo.png")} />
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>
                    </View>
                    <View style={styles.button}>
                        {/* <Animatable.View animation="slideInDown" easing="ease-out" iterationCount={1} duration={1000}> */}
                            <TouchableOpacity
                                style={styles.btn_wrap}
                                activeOpacity={0.9}
                                onPress={this.requestApi.bind(this)}
                            >
                                <Text style={styles.btn_text}>开始识别 {height}</Text>
                            </TouchableOpacity>
                        {/* </Animatable.View> */}
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
                {
                    this.state.requestStatus && <View style={styles.requestStatusView}>
                        <View style={styles.requestStatusContentView}>
                            <ActivityIndicator
                                style={styles.requestLoad}
                                color='#fff'
                                animating={true}
                                size="small"
                            />
                            <Text style={styles.requestText}>正在识别</Text>
                        </View>
                    </View>
                }
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
    requestStatusDialog: {
        opacity: 0.5,
        backgroundColor: '#000',
    },
    requestStatusView: {
        position: 'absolute',
        width: width,
        height: height - (STATUS_BAR_HEIGHT + NAVBSR_HEIGHT),
        top: STATUS_BAR_HEIGHT + NAVBSR_HEIGHT,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.5)',
        flex: 1,
    },
    requestStatusContentView: {
        paddingLeft: 18,
        paddingRight: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    requestLoad: {
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    requestText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
    },
    viewport: {
        width: width,
        height: width,
        backgroundColor: '#f5f6f6',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    imgLoad: {
        position: 'absolute',
        top: width/2 - 10,
        left: width/2 - 10,
        width: 20,
        height: 20,
        zIndex: 1,
    },
    choice_wrap: {
        width: 38,
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 38,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    choice_btn: {
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
