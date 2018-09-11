/**
 * header
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    PixelRatio,
    Text,
    View
} from 'react-native';
import { hidden } from 'ansi-colors';

export default class Header extends Component {
    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.font}>
                    <Text style={styles.font1}>网易</Text>
                    <Text style={styles.font2}>新闻</Text>
                    <Text style={styles.font3}>有态度</Text>
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        marginTop: 25,
        height: 48,
        borderBottomWidth: 3/PixelRatio.get(),
        borderBottomColor: '#EF2D36',
        alignItems: 'center',
    },
    font: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    font1: {
        color: '#CD1D1C',
    },
    font2: {
        color: '#FFF',
        backgroundColor: '#CD1D1C',
    },
    font3: {
        color: '#333'
    }
});
