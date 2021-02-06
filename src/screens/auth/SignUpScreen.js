import * as React from 'react';
import {  View, Text, Button, StyleSheet, TextInput } from 'react-native';
import Auth from '@aws-amplify/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
});

function SignUpScreen({ navigation }) {

  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [repeatPassword, onChangeRepeatPassword] = React.useState('');
  const [invalidMessage, setInvalidMessage] = React.useState(null);

  const signUp = async () => {
    const validPassword = password.length > 5 && (password === repeatPassword);
    if (validPassword) {
      setInvalidMessage(null);
      Auth.signUp({
        username: email,
        password,
        attributes: {
          email, // optional
          name,
        },
        validationData: [], // optional
      })
        .then((data) => {
          console.log(data);
          console.log('navigation: ', navigation);
          navigation.navigate('Confirmation', { email });
        })
        .catch((err) => {
          if (err.message) {
            setInvalidMessage(err.message);
          }
          console.log(err);
        });
    } else {
      setInvalidMessage('Password must be equal and have greater lenght than 6.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        placeholder="Name"
        onChangeText={(text) => onChangeName(text)}
        autoFocus
      />
      <TextInput
        value={email}
        placeholder="email@example.com"
        onChangeText={(text) => onChangeEmail(text)}
        autoCapitalize="none"
        autoCompleteType="email"
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        placeholder="password"
        onChangeText={(text) => onChangePassword(text)}
        secureTextEntry
        autoCompleteType="password"
      />
      <TextInput
        value={repeatPassword}
        placeholder="Repeat password"
        onChangeText={(text) => onChangeRepeatPassword(text)}
        secureTextEntry
        autoCompleteType="password"
      />
      <Button
        onPress={() => signUp()}
        title='Sign Up'
      />
      <Text>
        {invalidMessage}
      </Text>
    </View>
  );
}

export default SignUpScreen;