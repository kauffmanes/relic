import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SignOutScreen from '../screens/auth/SignOutScreen';
const AppStack = createStackNavigator();

const AppNavigator = ({ signOut }) => (
  <AppStack.Navigator>
    <AppStack.Screen name="Home">
      {({ navigation }) => <HomeScreen signOut={signOut} navigation={navigation} />}
    </AppStack.Screen>
    <AppStack.Screen name="SignUp">
      {() => <SignOutScreen signOut={signOut} />}
    </AppStack.Screen>
  </AppStack.Navigator>
);

export default AppNavigator;
