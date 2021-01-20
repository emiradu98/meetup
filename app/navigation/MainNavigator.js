import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthStack} from './auth/AuthStack';
import {connect} from 'react-redux';
import {BattlefieldScreen} from './battlefield/BattlefieldScreen';
import {MyTabBar} from './MyTabBar';
import {LeaderBoardScreen} from './leaderboard/LeaderBoardScreen';
import {ProfileStack} from './profile/ProfileStack';
import {checkPermissions} from '../helpers/actions/PermissionsActions';


const MainNavigator = ({isLoggedIn, checkPermissions}) => {
    useEffect(()=>{
        checkPermissions()
    }, [])
    useEffect(()=>{
        if(isLoggedIn){

        }
    }, [isLoggedIn])
    return (
        isLoggedIn ?
            <Tab.Navigator tabBar={props => <MyTabBar {...props}/>}
                           tabBarOptions={{
                               activeTintColor: '#B92317',
                               labelStyle: {
                                   margin: 0,
                                   fontSize: 12,
                                   marginTop: 5,
                               },
                               keyboardHidesTabBar: true,
                               style: [{
                                   backgroundColor: '#fff',
                                   border: 0,
                                   borderTopColor: '#fff',
                                   borderTopWidth: 0,
                               }],
                           }} initialRouteName={'Settings'}>
                <Tab.Screen name={'Battlefield'} component={BattlefieldScreen}
                            options={{
                                iconOff: require('../assets/animations/battlefield-off.json'),
                                iconOn: require('../assets/animations/battlefield-on.json'),
                            }}/>
                <Tab.Screen name={'Leaderboard'} component={LeaderBoardScreen}
                            options={{
                                iconOff: require('../assets/animations/leaderboard-off.json'),
                                iconOn: require('../assets/animations/leaderboard-on.json'),
                            }}/>
                <Tab.Screen name={'Profile'} component={ProfileStack}
                            options={{
                                iconOff: require('../assets/animations/profile-off.json'),
                                iconOn: require('../assets/animations/profile-on.json'),
                            }}/>
            </Tab.Navigator>
            :
            <AuthStack/>
    );
};

const Tab = createBottomTabNavigator();


export default connect((state) => ({isLoggedIn: state.user.isLoggedIn}), {checkPermissions})(MainNavigator);
