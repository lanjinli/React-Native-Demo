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
    FlatList
} from 'react-native';
import { hidden } from 'ansi-colors';
import NavigationBar from '../../utils/NavigationBar';
import { width, height, Demensions, STATUS_BAR_HEIGHT, NAVBSR_HEIGHT } from '../../utils/util';
import HttpUtils from '../../utils/httpUtils';

//定义详情
export default class rn_list extends Component {

    static navigationOptions = {
        header: () => null
    };

    constructor() {
        super();
        this.state = {
            listData: [],
            currentPage: 1,
            isTopLoading: false,
            requestState: true
        };
    }

    _keyExttactor = (item, index) => index.toString();

    componentWillMount() {
        this._isMounted = false
        this.requestApi(1)
    }
    
    componentWillUnmount() {
        this._isMounted = true
    }

    _renderItem (data) {
        return <Text style={styles.listText}>{data.item.title}</Text>
    };

    loadData(){
        console.log('下拉刷新')
        this.setState({
            isTopLoading: true
        });
        this.requestApi(1)
    }

    // 请求接口
    requestApi(page) {
        if(this._isMounted)return; 
        if(!this.state.requestState)return; 
        this.setState({
            requestState: false
        })
        console.log('触发请求')
        let currentPage = page?page:this.state.currentPage;
        HttpUtils.get(`https://route.showapi.com/958-1?page=${currentPage}&showapi_appid=81612&showapi_timestamp=${this.formatterDateTime()}&type=/category/weimanhua/kbmh&showapi_sign=519018cedfec427f9c9bea7f8e814c1b`,)
        .then(result=>{
            console.log(result);
            let oldData = this.state.listData;
            let newData = oldData;
            if(this.state.currentPage <= 1){
                newData = result.showapi_res_body.pagebean.contentlist;
            }else{
                newData = oldData.concat(result.showapi_res_body.pagebean.contentlist);
            }
            if(this._isMounted)return; 
            this.setState({
                listData: newData,
                currentPage: result.showapi_res_body.pagebean.currentPage + 1,
                isTopLoading: false,
                requestState: true
            })
        })
        .catch(error=>{
            console.log(error);
            if(this._isMounted)return;
            this.setState({
                isTopLoading: false,
                requestState: true
            })
        })
    }


    // 格式化时间
    formatterDateTime() {
        let date = new Date()
        let month = date.getMonth() + 1
        let datetime = date.getFullYear()
            + ""
            + (month >= 10 ? month : "0" + month)
            + ""
            + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
            + ""
            + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
            + ""
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
            + ""
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
        return datetime;
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
                <FlatList
                    data={this.state.listData}
                    keyExtractor={this._keyExttactor}
                    renderItem={(data) => this._renderItem(data)}
                    refreshing={this.state.isTopLoading}
                    onRefresh={()=>this.loadData()}
                    ListFooterComponent={()=><Text style={styles.listText}>加载中</Text>}
                    onEndReachedThreshold={0.1}
                    onEndReached={()=>this.requestApi()}
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
    listTitle: {
        height: 48,
        flex: 1,
        lineHeight: 48,
        fontSize: 16,
        backgroundColor: '#ccc'
    },
    listText: {
        height: 38,
        flex: 1,
        lineHeight: 38,
    },
    ItemSeparator: {
        height: 0.1,
        flex: 1,
        backgroundColor: '#ccc'
    }
});
