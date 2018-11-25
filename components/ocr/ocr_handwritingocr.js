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

//定义详情
export default class OcrHandwritingocr extends Component {

    static navigationOptions = {
        header: () => null
    };

    state = {
        avatarSource: null,
        videoSource: null,
        viewport_img: {
            width: 0,
            height: 0,
        }
    };

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
            console.log('Response = ', response);
            if (response.didCancel) {
                this.refs.toast.show('取消图像选择');
            }
            else if (response.error) {
                this.refs.toast.show('选择图像出错', response.error);
            }
            else {
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
                    avatarSource: source,
                    viewport_img: {
                        width: imgWidth,
                        height: imgHeight,
                    }
                });
            }
        });
    }

    componentDidMount() {
        this.requestApi()
    }

    // 请求接口
    requestApi(base64) {
        console.log('请求');
        // HttpUtils.post('http://lilanjin.top/demoapi/sign.php',{
        //     'url': 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_handwritingocr',
        //     'params': {
        //         'app_id': '2109841751',
        //         'time_stamp': Math.round(new Date().getTime()/1000).toString(),
        //         'nonce_str': Math.floor(Math.random()*100000).toString(),
        //         'sign': '',
        //         'image': '',
        //         'image_url': 'https://yyb.gtimg.com/ai/assets/ai-demo/large/hd-7-lg.jpg',
        //     }
        // })
        // .then(result=>{
        //     alert(result)
        //     console.log(result);
        // })
        // .catch(error=>{
        //     alert(result)
        //     console.log(error);
        // })
        HttpUtils.get('http://rap2api.taobao.org/app/mock/118796/example/test')
        .then(result=>{
            alert(result)
            console.log(result);
        })
        .catch(error=>{
            alert(result)
            console.log(error);
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
                        <TouchableOpacity style={[styles.NavBarBtn]} activeOpacity={0.7} onPress={() => this.props.navigation.goBack()} >
                            <Image style={{ width: 44, height: 44 }} source={require("../../assets/images/icon_back.png")} />
                        </TouchableOpacity>
                    }
                />
                <ScrollView>
                    <View style={styles.viewport}>
                        <Image style={this.state.viewport_img} source={this.state.avatarSource} />
                    </View>
                    <View style={styles.results}></View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.btn_wrap}
                            activeOpacity={0.9}
                            onPress={this.selectPhotoTapped.bind(this)}
                        >
                            <Text style={styles.btn_text}>上传图像</Text>
                        </TouchableOpacity>
                    </View>
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
