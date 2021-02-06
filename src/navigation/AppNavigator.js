import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

const AppStack = createStackNavigator();

const AppNavigator = ({ signOut }) => (
  <AppStack.Navigator>
    <AppStack.Screen name="Home">
      {() => <HomeScreen signOut={signOut} />}
    </AppStack.Screen>
  </AppStack.Navigator>
);

export default AppNavigator;
