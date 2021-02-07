import * as React from 'react';
import Auth from '@aws-amplify/auth';
import { DataStore } from '@aws-amplify/datastore';
import { NavigationContainer } from '@react-navigation/native';

import {
    StyleSheet, View, ActivityIndicator
} from 'react-native';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

function AuthLoadingScreen() {

    const [loading, setLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    const showLoadingSpinner = (!userToken && loading);
    let view = '';

    React.useState(() => {
      async function checkUser() {
        try {
          const user = await Auth.currentAuthenticatedUser();
          if (user) signIn(user);
        } catch(err) {
          setUserToken(null);
        } finally {
          setLoading(false);
        }
      }
      checkUser();
    }, []);

    function signIn(user) {
      setUserToken(user.signInUserSession.accessToken.jwtToken);
      setLoading(false);
    }

    async function signOut() {
      try {
        await Auth.signOut();
        await DataStore.clear();
        setUserToken(null);
      } catch (error) {
          console.log('error signing out: ', error);
      } finally {
        setLoading(false);
      }
    }

    if (showLoadingSpinner) {
      view = (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      );
    } else if (!userToken) {
      view = <AuthNavigator signIn={signIn} />;
    } else {
      view = <AppNavigator signOut={signOut} />;
    }
    
    return (
      <NavigationContainer>
        {view}
      </NavigationContainer>
    );
}

export default AuthLoadingScreen;