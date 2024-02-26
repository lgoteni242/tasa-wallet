import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MotPasseOublier from './src/screens/PassWordScreen';
import DashBoardScreen from "./src/screens/DashBoardScreen";
import BottomMenuScreen from './src/screens/BottomMenuScreen';
import CodeAccesScreen from './src/screens/CodeAccessScreen';
import { Provider, useSelector } from 'react-redux';
import store, { persistor } from './src/store/store';
import KycScreen from './src/screens/KycScreen';
import CodeAccesVerifScreen from './src/screens/CodeAccesVerifScreen';
import CodeAccesConfigScreen from './src/screens/CodeAccesConfigScreen';
import CodeDeblockAppScreen from './src/screens/CodeDeblockAppScreen';
import { PersistGate } from 'redux-persist/integration/react';


const Stack = createStackNavigator();

const Navigation = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const hasPassword = useSelector(state => state.auth.isCodeAcces);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            {hasPassword ? (
              <Stack.Screen name="CodeDeblockApp" component={CodeDeblockAppScreen} />
            ) : (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="MotPasseOublier" component={MotPasseOublier} />
              </>
            )}
            <Stack.Screen name="Dash" component={DashBoardScreen} />
            <Stack.Screen name="Menu" component={BottomMenuScreen} />
            <Stack.Screen name="CodeAcces" component={CodeAccesScreen} />
            <Stack.Screen name="Kyc" component={KycScreen} />
            <Stack.Screen name="CodeVerif" component={CodeAccesVerifScreen} />
            <Stack.Screen name="CodeAccesConfig" component={CodeAccesConfigScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="MotPasseOublier" component={MotPasseOublier} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;

// const App = () => {
//   const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
//   const hasPassword = useSelector(state => state.auth.hasPassword);

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <NavigationContainer>
//           <Stack.Navigator screenOptions={{ headerShown: false }}>
//             {isLoggedIn ? (
//               <>
//                 {hasPassword ? (
//                   <Stack.Screen name="CodeDeblockApp" component={CodeDeblockAppScreen} />
//                 ) : (
//                   <>
//                     <Stack.Screen name="Dash" component={DashBoardScreen} />
//                     <Stack.Screen name="Menu" component={BottomMenuScreen} />
//                     <Stack.Screen name="CodeAcces" component={CodeAccesScreen} />
//                     <Stack.Screen name="Kyc" component={KycScreen} />
//                     <Stack.Screen name="CodeVerif" component={CodeAccesVerifScreen} />
//                     <Stack.Screen name="Code d'accès" component={CodeAccesConfigScreen} />
//                   </>
//                 )}
//               </>
//             ) : (
//               <>
//                 <Stack.Screen name="Home" component={HomeScreen} />
//                 <Stack.Screen name="MotPasseOublier" component={MotPasseOublier} />
//               </>
//             )}
//           </Stack.Navigator>
//         </NavigationContainer>
//       </PersistGate>
//     </Provider >
//   );
// };

// export default App;

