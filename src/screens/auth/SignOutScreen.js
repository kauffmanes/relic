import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 100,
    },
  });

const SignOutScreen = ({ navigation, signOut }) => {
    return (
        <View style={styles.container}>
            <Button onPress={() => signOut()} title='Sign out' />
        </View>
    );
}

export default SignOutScreen;