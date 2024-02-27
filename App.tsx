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


const Stack = createStackNavigator();

const Navigation = () => {

  NavigationBar.setBackgroundColorAsync('white');
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });
  const hasPassword = useSelector((state) => {
    return state.auth.isCodeAcces;
  });
  const isLock = useSelector((state) => {
    return state.auth.isLock;
  });

  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const timerRef = useRef(null);

  // const _handleAppStateChange = async (nextAppState: string) => {

  //   if (isLoggedIn && hasPassword == false) {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       dispatch({ type: 'LOGOUT' });
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

  //   if (isLoggedIn && hasPassword) {
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
      {isLoggedIn ? (
        <>
          {hasPassword ? (
            <Stack.Screen
              name="CodeDeblockApp"
              component={CodeDeblockAppScreen}
            />
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="MotPasseOublier"
                component={MotPasseOublier}
              />
              {/* <Stack.Screen name="Menu" component={BottomMenuScreen} /> */}
            </>
          )}
          {!isLock && ( // Vérifier si l'application n'est pas verrouillée
            <>
              <Stack.Screen name="Dash" component={DashBoardScreen} />
              <Stack.Screen name="Menu" component={BottomMenuScreen} />
              <Stack.Screen name="CodeAcces" component={CodeAccesScreen} />
              <Stack.Screen name="Kyc" component={KycScreen} />
              <Stack.Screen name="CodeVerif" component={CodeAccesVerifScreen} />
              <Stack.Screen
                name="CodeAccesConfig"
                component={CodeAccesConfigScreen}
              />
            </>
          )}
          {isLock && ( // Vérifier si l'application n'est pas verrouillée
            <Stack.Screen
              name="CodeDeblockApp"
              component={CodeDeblockAppScreen}
            />
          )}
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MotPasseOublier" component={MotPasseOublier} />
          <Stack.Screen name="Menu" component={BottomMenuScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;