import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
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
import PresentationPage from "./src/screens/PresentationPage";


const Stack = createStackNavigator();

const Navigation = () => {

  // NavigationBar.setBackgroundColorAsync('white');

  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });

  const isCodeAcces = useSelector((state) => {
    return state.auth.isCodeAcces;
  });

  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const timerRef = useRef(null);

  // Si l'utilisateur est déjà connecté et l'application est verrouillée, affichez l'écran de déverrouillage
  if (isLoggedIn && isCodeAcces) {
    return (
      <Stack.Navigator initialRouteName="CodeDeblockApp" screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
        <Stack.Screen name="CodeDeblockApp" component={CodeDeblockAppScreen} />
        <Stack.Screen name="Log" component={LoginScree} />
        <Stack.Screen name="Dash" component={DashBoardScreen} />
        <Stack.Screen name="CodeAcces" component={CodeAccesScreen} />
        <Stack.Screen name="CodeVerif" component={CodeAccesVerifScreen} />
        <Stack.Screen name="Kyc" component={KycScreen} />
        <Stack.Screen name="CodeAccesConfig" component={CodeAccesConfigScreen} />
        <Stack.Screen name="Menu" component={BottomMenuScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    );
  }

  // Si l'utilisateur est déjà connecté mais l'application n'est pas verrouillée, affichez les écrans normaux
  if (isLoggedIn && !isCodeAcces) {
    return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >
        {/* <Stack.Screen name="Presentation" component={PresentationPage} /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="register" component={RegistrationForm} />
        <Stack.Screen name="MotPasseOublier" component={MotPasseOublier} />
        <Stack.Screen name="Menu" component={BottomMenuScreen} />
        <Stack.Screen name="CodeDeblockApp" component={CodeDeblockAppScreen} />
        <Stack.Screen name="Log" component={LoginScree} />
        <Stack.Screen name="Dash" component={DashBoardScreen} />
        <Stack.Screen name="CodeAcces" component={CodeAccesScreen} />
        <Stack.Screen name="CodeVerif" component={CodeAccesVerifScreen} />
        <Stack.Screen name="Kyc" component={KycScreen} />
        <Stack.Screen name="CodeAccesConfig" component={CodeAccesConfigScreen} />
      </Stack.Navigator>
    );
  }

  // Si l'utilisateur n'est pas connecté, affichez les écrans de connexion
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
      <Stack.Screen name="Presentation" component={PresentationPage} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CodeDeblockApp" component={CodeDeblockAppScreen} />
      <Stack.Screen name="register" component={RegistrationForm} />
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