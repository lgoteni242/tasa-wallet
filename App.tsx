import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import MotPasseOublier from "./src/screens/PassWordScreen";
import DashBoardScreen from "./src/screens/DashBoardScreen";
import BottomMenuScreen from "./src/screens/BottomMenuScreen";
import CodeAccesScreen from "./src/screens/CodeAccessScreen";
import { Provider, useSelector, useDispatch } from "react-redux";
import store, { persistor } from "./src/store/store";
import KycScreen from "./src/screens/KycScreen";
import CodeAccesVerifScreen from "./src/screens/CodeAccesVerifScreen";
import CodeAccesConfigScreen from "./src/screens/CodeAccesConfigScreen";
import CodeDeblockAppScreen from "./src/screens/CodeDeblockAppScreen";
import { PersistGate } from "redux-persist/integration/react";
import { AppState } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { HandleChange } from './HandleChange';
import LoginScree from "./src/screens/SettingScreen";
import RegistrationForm from "./src/screens/RegistrationForm";


const Stack = createStackNavigator();

const Navigation = () => {

  NavigationBar.setBackgroundColorAsync('white');

  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });

  const isCodeAcces = useSelector((state) => {
    return state.auth.isCodeAcces;
  });

  const isLock = useSelector((state) => {
    return state.auth.isLock;
  });

  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const timerRef = useRef(null);

  // const _handleAppStateChange = async (nextAppState: string) => {

  //   if (isLoggedIn && isCodeAcces == false) {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       timerRef.current = setTimeout(() => {  
  //         dispatch({ type: 'LOGOUT' });
  //         clearTimeout(timerRef.current);
  //       }, 300000);
  //     }
  //   }

  //   if (isLoggedIn && isCodeAcces) {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       dispatch({ type: 'LOCK_APP' });
  //       clearTimeout(timerRef.current);
  //     }
  //     if (
  //       appState.current.match(/active/) &&
  //       nextAppState.match(/inactive|background/)
  //     ) {
  //       timerRef.current = setTimeout(() => {
  //         setLock(true);
  //       }, 100); // 300000ms = 5 minutes
  //     }
  //   }
  //   appState.current = nextAppState;
  // };

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', _handleAppStateChange);
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);


  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CodeDeblockApp" component={CodeDeblockAppScreen} />
      <Stack.Screen name="Dash" component={DashBoardScreen} />
      <Stack.Screen name="Log" component={LoginScree} />
      <Stack.Screen name="Menu" component={BottomMenuScreen} />
      <Stack.Screen name="CodeAcces" component={CodeAccesScreen} />
      <Stack.Screen name="Kyc" component={KycScreen} />
      <Stack.Screen name="register" component={RegistrationForm} />
      <Stack.Screen name="CodeVerif" component={CodeAccesVerifScreen} />
      <Stack.Screen name="CodeAccesConfig" component={CodeAccesConfigScreen}
      />
      <Stack.Screen name="MotPasseOublier" component={MotPasseOublier} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          {/* <HandleChange> */}
          <Navigation />
          {/* </HandleChange> */}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;