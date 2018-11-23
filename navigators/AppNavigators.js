import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";
import WelcomePage from '../components/welcome';
import HomePage from '../components/home';
import Aside from '../components/aside';
import ListPage from '../components/list';
import InfoPage from '../components/info';

export const HomeDrawerNavigator = DrawerNavigator(
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


export const AppStackNavigator = StackNavigator(
    {
        Welcome: {
            screen: WelcomePage,
        },
        HomeDrawerNav: {
            screen: HomeDrawerNavigator,
        },
        List: {
            screen: ListPage,
        },
        Info: {
            screen: InfoPage,
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