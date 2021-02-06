import * as React from 'react';
import Auth from '@aws-amplify/auth';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
});

export default function SignIn({ navigation, signIn: signInCb }) {

  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const signIn = async () => {
    if (email.length > 4 && password.length > 2) {
      await Auth.signIn(email, password)
        .then((user) => {
          signInCb(user);
        })
        .catch((err) => {
          if (!err.message) {
            console.log('1 Error when signing in: ', err);
            Alert.alert('Error when signing in: ', err);
          } else {
            if (err.code === 'UserNotConfirmedException') {
              console.log('User not confirmed');
              navigation.navigate('Confirmation', {
                email,
              });
            }
            if (err.message) {
              setErrorMessage(err.message);
            }
          }
        });
    } else {
      setErrorMessage('Provide a valid email and password');
    }
  };

    return (
      <View style={styles.container}>
      <TextInput
        value={email}
        placeholder="email@example.com"
        onChangeText={(text) => onChangeEmail(text)}
        autoCompleteType="email"
        autoCapitalize="none"
        autoFocus
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        placeholder="password"
        onChangeText={(text) => onChangePassword(text)}
        secureTextEntry
        autoCompleteType="password"
      />
      <Button onPress={() => signIn()}
        title='Sign In'
      />
      <Text>{errorMessage}</Text>
      <Button onPress={() => navigation.navigate('ForgetPassword')} title='Forget Password'/>
    </View>
    );
}