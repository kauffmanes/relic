// https://github.com/phedkvist/rn-cognito-tutorial/blob/master/navigation/AuthNavigator.js
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ConfirmationScreen from '../screens/auth/ConfirmationScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';

const AuthStack = createStackNavigator();
const AuthModalStack = createStackNavigator();

const AuthNavigator = ({ signIn }) => (
    <AuthModalStack.Navigator mode="modal" headerMode="none">
      <AuthModalStack.Screen name="AuthPages">
        {() => (
          <AuthStack.Navigator>
            <AuthStack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
            <AuthStack.Screen name="SignUp" component={SignUpScreen} />
            <AuthStack.Screen name="SignIn">
              {({ navigation }) => <SignInScreen signIn={signIn} navigation={navigation} />}
            </AuthStack.Screen>
            <AuthStack.Screen
              name="ForgetPassword"
              component={ForgotPasswordScreen}
            />
          </AuthStack.Navigator>
        )}
      </AuthModalStack.Screen>
      <AuthModalStack.Screen options={{ headerShown: false }} name="Confirmation" component={ConfirmationScreen} />
    </AuthModalStack.Navigator>
  );

export default AuthNavigator;