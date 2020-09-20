import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// routes
// configs
import config from './routes.config';

import RegisterPoint from '../pages/RegisterPoint';
import ListPoint from '../pages/ListPoint';
import Favorites from '../pages/Favorites';

const AppStack = createStackNavigator();

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          config.screenOptions({ route, focused, color, size }),
      })}
      tabBarOptions={config.tabBarOptions}
    >
      <Screen name="Cadastrados" component={ListPoint} />
      <Screen name="Novo" component={RegisterPoint} />
      <Screen name="Favoritos" component={Favorites} />
    </Navigator>
  );
};

const Routes: React.FC = () => {
  return (
    <AppStack.Navigator headerMode="none">
      {/* <AppStack.Screen name="Login" component={Login} /> */}
      <AppStack.Screen name="Home" component={TabNavigator} />
    </AppStack.Navigator>
  );
};

export default Routes;
