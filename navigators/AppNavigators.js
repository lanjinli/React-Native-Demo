import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";
import WelcomePage from '../components/welcome';
import HomePage from '../components/home';
import Aside from '../components/aside';
import ListPage from '../components/list';
import InfoPage from '../components/info';

import OcrHandwritingocrPage from '../components/ocr/ocr_handwritingocr';
import OcrGeneralocrPage from '../components/ocr/ocr_generalocr';
import OcrIdcardocrPage from '../components/ocr/ocr_idcardocr';

import RnModalboxPage from '../components/rn/rn_modalbox';
import RnListPage from '../components/rn/rn_list';
import RnSnapCarouselPage from '../components/rn/rn_snap_carousel';
import RnDialogPage from '../components/rn/rn_dialog';

export const HomeDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomePage,
        }
    },
    {
        drawerWidth: 220, // 抽屉宽
        drawerPosition: 'left', // 抽屉在左边还是右边
        contentComponent: Aside,  // 自定义抽屉组件
        contentOptions: {
            initialRouteName: HomePage, // 默认页面组件
            activeTintColor: '#008AC9',  // 选中文字颜色
            activeBackgroundColor: '#f5f5f5', // 选中背景颜色
            inactiveTintColor: '#000',  // 未选中文字颜色
            inactiveBackgroundColor: '#fff', // 未选中背景颜色
            style: {}
        }
    }
);


export const AppStackNavigator = createStackNavigator(
    {
        Welcome: {
            screen: WelcomePage
        },
        HomeDrawerNav: {
            screen: HomeDrawerNavigator
        },
        List: {
            screen: ListPage
        },
        Info: {
            screen: InfoPage
        },
        OcrHandwritingocr: {
            screen: OcrHandwritingocrPage
        },
        OcrGeneralocr: {
            screen: OcrGeneralocrPage
        },
        OcrIdcardocr: {
            screen: OcrIdcardocrPage
        },
        RnModalbox: {
            screen: RnModalboxPage
        },
        RnList: {
            screen: RnListPage
        },
        RnSnapCarousel: {
            screen: RnSnapCarouselPage
        },
        RnDialog: {
            screen: RnDialogPage
        }
    },
    {
        initialRouteName: 'Welcome',
        navigationOptions: {
            header: () => null
        },
        // mode: 'card',
        // headerMode: 'screen'
        transitionConfig: () => ({ // 修改页面跳转动画方向
            screenInterpolator: StackViewStyleInterpolator.forHorizontal,
        }),
    }
);