import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './DashBoardScreen';
import SettingsScreen from './SettingsScreens';
import HistoriqueScreen from './HistoriqueScreen';
import UserScreen from './UserScreen';
import default_color from '../styles/color';

const Tab = createBottomTabNavigator();

const CustomTabIcon = ({ name, size, color, focused }) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor,
            borderRadius: 20, // Rayon arrondi pour l'effet de pilule
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
                        iconName = focused ? 'user' : 'user';
                    }else if(route.name === 'Pass'){
                        iconName = focused ? 'exchange' : 'exchange';
                    }
                    return <CustomTabIcon name={iconName} size={size} color={color} focused={focused} />;
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'gray',
                tabBarLabel: () => null,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 13,
                    left: 10,
                    right: 10,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 30,
                    height: 47,
                    shadowColor: '#7F5DF0',
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                    elevation: 5
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Pass" component={HistoriqueScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={UserScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
