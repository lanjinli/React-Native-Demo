import Dialog, {
    DialogTitle,
    DialogContent,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';

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
    AppRegistry,
    Dimensions,
    TextInput,
    Button
} from 'react-native';
import { hidden } from 'ansi-colors';
import NavigationBar from '../../utils/NavigationBar';
import { width, height, Demensions, STATUS_BAR_HEIGHT, NAVBSR_HEIGHT } from '../../utils/util';
import HttpUtils from '../../utils/httpUtils';
var screen = Dimensions.get('window');

//定义详情
export default class RnDialog extends Component {

    static navigationOptions = {
        header: () => null
    };

    constructor() {
        super();
        this.state = {
            customBackgroundDialog: false,
            defaultAnimationDialog: false,
            scaleAnimationDialog: false,
            slideAnimationDialog: false,
            setCustomBackgroundDialog: false
        };
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
                    <View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.btn_wrap}
                                activeOpacity={0.9}
                                onPress={() => {
                                    this.setState({
                                        defaultAnimationDialog: true,
                                    });
                                }}
                            >
                                <Text style={styles.btn_text}>Show Dialog - Default Animation</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.btn_wrap}
                                activeOpacity={0.9}
                                onPress={() => {
                                    this.setState({
                                        scaleAnimationDialog: true,
                                    });
                                }}
                            >
                                <Text style={styles.btn_text}>Show Dialog - Scale Animation</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.btn_wrap}
                                activeOpacity={0.9}
                                onPress={() => {
                                    this.setState({
                                        slideAnimationDialog: true,
                                    });
                                }}
                            >
                                <Text style={styles.btn_text}>Show Dialog - Slide Animation</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.btn_wrap}
                                activeOpacity={0.9}
                                onPress={() => {
                                    this.setState({
                                        customBackgroundDialog: true,
                                    });
                                }}
                            >
                                <Text style={styles.btn_text}>Show Dialog - Custom Background Style</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.btn_wrap}
                                activeOpacity={0.9}
                                onPress={() => {
                                    this.setState({
                                        setCustomBackgroundDialog: true,
                                    });
                                }}
                            >
                                <Text style={styles.btn_text}>Show Dialog - 测试</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Dialog
                        onDismiss={() => {
                            this.setState({ defaultAnimationDialog: false });
                        }}
                        width={0.9}
                        visible={this.state.defaultAnimationDialog}
                        rounded
                        dialogTitle={
                            <DialogTitle
                                title="Popup Dialog - Default Animation"
                                style={{
                                    backgroundColor: '#fff',
                                }}
                                hasTitleBar={false}
                                align="left"
                            />
                        }
                        actions={[
                            <DialogButton
                                text="取消"
                                onPress={() => {
                                    this.setState({ defaultAnimationDialog: false });
                                }}
                                key="button-1"
                            />,
                            <DialogButton
                                text="确认"
                                onPress={() => {
                                    this.setState({ defaultAnimationDialog: false });
                                }}
                                key="button-2"
                            />,
                        ]}
                    >
                        <DialogContent
                            style={{
                                backgroundColor: '#fff',
                            }}
                        >
                            <Text>Default Animation</Text>
                            <Text>No onTouchOutside handler. will not dismiss when touch overlay.</Text>
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        onTouchOutside={() => {
                            this.setState({ scaleAnimationDialog: false });
                        }}
                        width={0.9}
                        visible={this.state.scaleAnimationDialog}
                        dialogAnimation={new ScaleAnimation()}
                        dialogTitle={
                            <DialogTitle
                                title="Popup Dialog - Scale Animation"
                                hasTitleBar={false}
                            />
                        }
                        actions={[
                            <DialogButton
                                text="关闭"
                                onPress={() => {
                                    this.setState({ scaleAnimationDialog: false });
                                }}
                                key="button-1"
                            />,
                        ]}
                    >
                        <DialogContent>
                            <View style={styles.button}>
                                <TouchableOpacity
                                    style={styles.btn_wrap}
                                    activeOpacity={0.9}
                                    onPress={() => {
                                        this.setState({
                                            defaultAnimationDialog: true,
                                        });
                                    }}
                                >
                                    <Text style={styles.btn_text}>Show Dialog - Default Animation</Text>
                                </TouchableOpacity>
                            </View>
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        onDismiss={() => {
                            this.setState({ slideAnimationDialog: false });
                        }}
                        onTouchOutside={() => {
                            this.setState({ slideAnimationDialog: false });
                        }}
                        visible={this.state.slideAnimationDialog}
                        dialogTitle={<DialogTitle title="Popup Dialog - Slide Animation" />}
                        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                    >
                        <DialogContent>
                            <Text>Slide Animation</Text>
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        onDismiss={() => {
                            this.setState({ customBackgroundDialog: false });
                        }}
                        onTouchOutside={() => {
                            this.setState({ customBackgroundDialog: false });
                        }}
                        zIndex={1000}
                        backgroundStyle={styles.customBackgroundDialog}
                        dialogStyle={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                        dialogTitle={
                            <DialogTitle
                                title="Popup Dialog - Custom Background Style"
                                hasTitleBar={false}
                                textStyle={{ color: '#fff' }}
                            />
                        }
                        visible={this.state.customBackgroundDialog}
                    >
                        <View style={styles.dialogContentView}>
                            <Text style={{ color: '#fff' }}>Custom backgroundStyle</Text>
                        </View>
                    </Dialog>

                    <Dialog
                        onDismiss={() => {
                            this.setState({ setCustomBackgroundDialog: false });
                        }}
                        onTouchOutside={() => {
                            this.setState({ setCustomBackgroundDialog: false });
                        }}

                        zIndex={1000}
                        backgroundStyle={styles.setCustomBackgroundDialog}
                        dialogStyle={{
                            backgroundColor: 'rgba(0,0,0,0.6)',
                        }}
                        overlayOpacity={0}
                        hasOverlay={false}
                        width={110}
                        height={110}
                        visible={this.state.setCustomBackgroundDialog}
                        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                    >
                        <View style={styles.dialogContentView}>
                            <Text style={{ color: '#fff' }}>Custom backgroundStyle</Text>
                        </View>
                    </Dialog>

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
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogContentView: {
        // flex: 1,
        paddingLeft: 18,
        paddingRight: 18,
        // backgroundColor: '#000',
        // opacity: 0.4,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    navigationBar: {
        borderBottomColor: '#b5b5b5',
        borderBottomWidth: 0.5,
        backgroundColor: '#ffffff',
    },
    navigationTitle: {
        padding: 10,
    },
    navigationButton: {
        padding: 10,
    },
    navigationLeftButton: {
        paddingLeft: 20,
        paddingRight: 40,
    },
    navigator: {
        flex: 1,
        // backgroundColor: '#000000',
    },
    customBackgroundDialog: {
        opacity: 0.5,
        backgroundColor: '#000',
    },
    setCustomBackgroundDialog: {
        opacity: 0.5,
        backgroundColor: '#000',
    }
});
