import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MotPasseOublier from './src/screens/PassWordScreen';
import DashBoardScreen from './src/screens/DashBoardScreen';
import BottomMenuScreen from './src/screens/BottomMenuScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTintColor: 'white', // Changez la couleur du texte de la barre de navigation ici
        headerTitleStyle: {
          fontWeight: 'bold', // Changez le style du texte de la barre de navigation ici
        },
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dash" component={DashBoardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MotPasseOublier" component={MotPasseOublier} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={BottomMenuScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
