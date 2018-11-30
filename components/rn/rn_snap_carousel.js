import Carousel from 'react-native-snap-carousel';

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
import { width, height, Demensions, STATUS_BAR_HEIGHT, NAVBSR_HEIGHT } from '../../utils/util';
import HttpUtils from '../../utils/httpUtils';

//定义详情
export default class rn_snap_carousel extends Component {

    static navigationOptions = {
        header: () => null
    };

    constructor() {
        super();
        this.state = {
            ENTRIES1: [
                {
                    title: 'Beautiful and dramatic Antelope Canyon',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                    illustration: 'https://i.imgur.com/UYiroysl.jpg'
                },
                {
                    title: 'Earlier this morning, NYC',
                    subtitle: 'Lorem ipsum dolor sit amet',
                    illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
                },
                {
                    title: 'White Pocket Sunset',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
                    illustration: 'https://i.imgur.com/MABUbpDl.jpg'
                },
                {
                    title: 'Acrocorinth, Greece',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                    illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
                },
                {
                    title: 'The lone tree, majestic landscape of New Zealand',
                    subtitle: 'Lorem ipsum dolor sit amet',
                    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
                },
                {
                    title: 'Middle Earth, Germany',
                    subtitle: 'Lorem ipsum dolor sit amet',
                    illustration: 'https://i.imgur.com/lceHsT6l.jpg'
                }
            ],
            ENTRIES2: [
                {
                    title: 'Favourites landscapes 1',
                    subtitle: 'Lorem ipsum dolor sit amet',
                    illustration: 'https://i.imgur.com/SsJmZ9jl.jpg'
                },
                {
                    title: 'Favourites landscapes 2',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                    illustration: 'https://i.imgur.com/5tj6S7Ol.jpg'
                },
                {
                    title: 'Favourites landscapes 3',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat',
                    illustration: 'https://i.imgur.com/pmSqIFZl.jpg'
                },
                {
                    title: 'Favourites landscapes 4',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                    illustration: 'https://i.imgur.com/cA8zoGel.jpg'
                },
                {
                    title: 'Favourites landscapes 5',
                    subtitle: 'Lorem ipsum dolor sit amet',
                    illustration: 'https://i.imgur.com/pewusMzl.jpg'
                },
                {
                    title: 'Favourites landscapes 6',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat',
                    illustration: 'https://i.imgur.com/l49aYS3l.jpg'
                }
            ]
        };
    }

    componentWillMount() {
    }
    
    componentWillUnmount() {
    }

    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Image style={styles.image} source={{uri: item.illustration}}/>
                <View style={styles.text}>
                    <Text style={styles.title}>{ item.title }</Text>
                    <Text style={styles.subtitle}>{ item.subtitle }</Text>
                </View>
            </View>
        );
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
                <ScrollView
                    style={styles.ScrollView}
                >
                    <Carousel
                        data={this.state.ENTRIES1}
                        renderItem={this._renderItem}
                        sliderWidth={width}
                        itemWidth={width-60}
                    />
                    <Carousel
                        data={this.state.ENTRIES2}
                        renderItem={this._renderItem}
                        sliderWidth={width}
                        itemWidth={width}
                        loop={true}
                        autoplay={true}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={1}
                        layout={'default'}
                    />
                    <Carousel
                        data={this.state.ENTRIES2}
                        renderItem={this._renderItem}
                        sliderWidth={width}
                        itemWidth={width - 60}
                        loop={true}
                        autoplay={true}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={1}
                        layout={'stack'}
                    />
                    <Carousel
                        data={this.state.ENTRIES2}
                        renderItem={this._renderItem}
                        sliderWidth={width}
                        itemWidth={width - 60}
                        loop={true}
                        autoplay={true}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={1}
                        layout={'tinder'}
                    />
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
    toast: {
        backgroundColor: 'rgba(0,0,0,.7)',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 6
    },
    ScrollView: {
        backgroundColor: '#edf1f7'
    },
    carousel: {
        paddingVertical: 20,
    },
    slide: {
        marginVertical: 20,
        borderRadius: 6,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 170,
    },
    text: {
        height: 60,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    subtitle: {
        fontSize: 14,
        color: '#454545'
    }
});
