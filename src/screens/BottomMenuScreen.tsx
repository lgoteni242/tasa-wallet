import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from "./DashBoardScreen";
// import SettingsScreen from './StatScreen';
import HistoriqueScreen from './HistoriqueScreen';
import default_color from '../styles/color';
import ScrollViewAnimatedHeader from './SettingScreen'
import * as NavigationBar from 'expo-navigation-bar';
;

const Tab = createBottomTabNavigator();

const CustomTabIcon = ({ name, size, color, focused }) => {
    NavigationBar.setBackgroundColorAsync('black');

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            paddingVertical: 6,
            paddingHorizontal: 30,
            backgroundColor: focused ? default_color.orange : 'transparent',
        }}>
            <Icon name={name} size={size} color={color} />
        </View>
    );
};

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'cog' : 'cog';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'bar-chart' : 'bar-chart';
                    } else if (route.name === 'Pass') {
                        iconName = focused ? 'history' : 'history';
                    }
                    return <CustomTabIcon name={iconName} size={size} color={color} focused={focused} />;
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: default_color.grayColor,
                tabBarLabel: () => null,
                tabBarStyle: {
                    position: 'absolute',
                    // bottom: 5,
                    // left: 10,
                    // right: 10,
                    // elevation: 5,
                    backgroundColor: '#ffffff',
                    // borderRadius: 30,
                    height: 47,
                    // shadowColor: '#7F5DF0',
                    // shadowColor: 'rgba(151,34,13,1)',
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Pass" component={HistoriqueScreen} options={{ headerShown: false }} />
            {/* <Tab.Screen name="Profile" component={SettingsScreen} options={{ headerShown: false }} /> */}
            <Tab.Screen name="Settings" component={ScrollViewAnimatedHeader} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
