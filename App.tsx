// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
// import HomeScreen from './src/screens/HomeScreen';
// import MotPasseOublier from './src/screens/PassWordScreen';
// import DashBoardScreen from "./src/screens/DashBoardScreen";
// import BottomMenuScreen from './src/screens/BottomMenuScreen';
// import CodeAccesScreen from './src/screens/CodeAccessScreen';
// import { Provider } from 'react-redux';
// import store from './src/store/store';
// import KycScreen from './src/screens/KycScreen';
// import CodeAccesVerifScreen from './src/screens/CodeAccesVerifScreen';
// import CodeAccesConfigScreen from './src/screens/CodeAccesConfigScreen';

// const Stack = createStackNavigator();

// const App = () => {

//   return (
//     <Provider store={store}>

//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{
//           cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//           headerTintColor: 'white', // Changez la couleur du texte de la barre de navigation ici
//           headerTitleStyle: {
//             fontWeight: 'bold', // Changez le style du texte de la barre de navigation ici
//           },
//         }}>
//           <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//           {/* <Stack.Screen name="RegisForme" component={RegistrationForm} options={{ headerShown: false }} /> */}
//           <Stack.Screen name="Dash" component={DashBoardScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="MotPasseOublier" component={MotPasseOublier} options={{ headerShown: false }} />
//           <Stack.Screen name="Menu" component={BottomMenuScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="CodeAcces" component={CodeAccesScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="Kyc" component={KycScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="CodeVerif" component={CodeAccesVerifScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="Code d'accès" component={CodeAccesConfigScreen} options={{ headerShown: false }} />
//         </Stack.Navigator>
//       </NavigationContainer >

//     </Provider>

//   );
// };
// export default App;

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MotPasseOublier from './src/screens/PassWordScreen';
import DashBoardScreen from "./src/screens/DashBoardScreen";
import BottomMenuScreen from './src/screens/BottomMenuScreen';
import CodeAccesScreen from './src/screens/CodeAccessScreen';
import { Provider } from 'react-redux';
import store, { persistor } from './src/store/store';
import KycScreen from './src/screens/KycScreen';
import CodeAccesVerifScreen from './src/screens/CodeAccesVerifScreen';
import CodeAccesConfigScreen from './src/screens/CodeAccesConfigScreen';
import CodeDeblockAppScreen from './src/screens/CodeDeblockAppScreen';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createStackNavigator();

const App = () => {

  useEffect(() => {
    // Accès à l'état global de l'application
    const state = store.getState();
    const isLoggedIn = state.auth.isLoggedIn;
    const accessCode = state.auth.accessCode;

    console.error(accessCode)
    // Redirection au chargement de l'application
    if (isLoggedIn && isPasswordSet) {
      // Rediriger vers l'écran de déverrouillage
      // Remplacez 'accessApp' par le nom de votre écran de déverrouillage
      navigation.navigate('accessApp');
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="accessApp" component={CodeDeblockAppScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Dash" component={DashBoardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Menu" component={BottomMenuScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CodeAcces" component={CodeAccesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Kyc" component={KycScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CodeVerif" component={CodeAccesVerifScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Code d'accès" component={CodeAccesConfigScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>

    </Provider >
  );
};

export default App;

