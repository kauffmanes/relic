/**
 * Relic Data Collection App
 * https://github.com/kauffmanes/relic
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import AppNavigation from './navigation';

function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AppNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});

export default App;

