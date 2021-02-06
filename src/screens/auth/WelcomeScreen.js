import * as React from 'react';
import {  View, Text, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    margin: 10,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '800',
    // color: 'white',
    // textShadowColor: 'rgba(0, 0, 0, 0.95)',
    padding: 15,
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 10,
  },
  button: {
    marginTop: 10,
  },
});

function WelcomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text
            style={styles.title}
          >
            Welcome Page
          </Text>
          <View>
          <Button
            onPress={() => navigation.navigate('SignIn')}
            title="Sign In"
          />
        </View>
        <View style={styles.button}>
          <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
        </View>
        </View>
      </View>
    );
}

export default WelcomeScreen;