import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';

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
    TextInput
} from 'react-native';
import { hidden } from 'ansi-colors';
import NavigationBar from '../../utils/NavigationBar';
import {width, height, Demensions, STATUS_BAR_HEIGHT, NAVBSR_HEIGHT} from '../../utils/util';
import HttpUtils from '../../utils/httpUtils';
var screen = Dimensions.get('window');

//定义详情
export default class RnModalbox extends Component {

    static navigationOptions = {
        header: () => null
    };

    constructor() {
        super();
        this.state = {
            isOpen: false,
            isDisabled: false,
            swipeToClose: true,
            sliderValue: 0.3
        };
    }

    onClose() {
        console.log('Modal just closed');
    }

    onOpen() {
        console.log('Modal just opened');
    }

    onClosingState(state) {
        console.log('the open/close of the swipeToClose just changed');
    }

    renderList() {
        var list = [];

        for (var i=0;i<50;i++) {
            list.push(<Text style={styles.text} key={i}>Elem {i}</Text>);
        }

        return list;
    }

    render() {
        const { data } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        var BContent = <Button onPress={() => this.setState({isOpen: false})} style={[styles.btn, styles.btnModal]}>X</Button>;
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
                <View style={styles.wrapper}>
                    <Button onPress={() => this.refs.modal1.open()} style={styles.btn}>Basic modal</Button>
                    <Button onPress={() => this.refs.modal2.open()} style={styles.btn}>Position top</Button>
                    <Button onPress={() => this.refs.modal3.open()} style={styles.btn}>Position centered + backdrop + disable</Button>
                    <Button onPress={() => this.refs.modal4.open()} style={styles.btn}>Position bottom + backdrop + slider</Button>
                    <Button onPress={() => this.setState({isOpen: true})} style={styles.btn}>Backdrop + backdropContent</Button>
                    <Button onPress={() => this.refs.modal6.open()} style={styles.btn}>Position bottom + ScrollView</Button>
                    <Button onPress={() => this.refs.modal7.open()} style={styles.btn}>Modal with keyboard support</Button>
                </View>
                <Modal
                style={[styles.modal, styles.modal1]}
                ref={"modal1"}
                swipeToClose={this.state.swipeToClose}
                onClosed={this.onClose}
                onOpened={this.onOpen}
                onClosingState={this.onClosingState}>
                    <Text style={styles.text}>Basic modal</Text>
                    <Button onPress={() => this.setState({swipeToClose: !this.state.swipeToClose})} style={styles.btn}>Disable swipeToClose({this.state.swipeToClose ? "true" : "false"})</Button>
                </Modal>

                <Modal style={[styles.modal, styles.modal2]} backdrop={false}  position={"top"} ref={"modal2"}>
                <Text style={[styles.text, {color: "white"}]}>Modal on top</Text>
                </Modal>

                <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
                <Text style={styles.text}>Modal centered</Text>
                <Button onPress={() => this.setState({isDisabled: !this.state.isDisabled})} style={styles.btn}>Disable ({this.state.isDisabled ? "true" : "false"})</Button>
                </Modal>

                <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal4"}>
                <Text style={styles.text}>Modal on bottom with backdrop</Text>
                <Slider style={{width: 200}} value={this.state.sliderValue} onValueChange={(value) => this.setState({sliderValue: value})} />
                </Modal>

                <Modal isOpen={this.state.isOpen} onClosed={() => this.setState({isOpen: false})} style={[styles.modal, styles.modal4]} position={"center"} backdropContent={BContent}>
                <Text style={styles.text}>Modal with backdrop content</Text>
                </Modal>

                <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal6"} swipeArea={20}>
                <ScrollView>
                    <View style={{width: screen.width, paddingLeft: 10}}>
                    {this.renderList()}
                    </View>
                </ScrollView>
                </Modal>

                <Modal ref={"modal7"} style={[styles.modal, styles.modal4]} position={"center"}>
                <View>
                    <TextInput style={{height: 50, width: 200, backgroundColor: '#DDDDDD'}}/>
                </View>
                </Modal>
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
    wrapper: {
        paddingTop: 50,
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal2: {
        height: 230,
        backgroundColor: "#3B5998"
    },
    modal3: {
        height: 300,
        width: 300
    },
    modal4: {
        height: 300
    },
    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },
    btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },
    text: {
        color: "black",
        fontSize: 22
    }
});