import * as React from 'react';
import {  View, StyleSheet, Text, Button, TextInput } from 'react-native';
import Auth from '@aws-amplify/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

function ConfirmationScreen({ route, navigation }) {

  const [authCode, setAuthCode] = React.useState('');
  const [error, setError] = React.useState(' ');
  console.log('confirmation navigation: ', navigation);
  const { email } = route.params;

  const confirmSignUp = async () => {
    if (authCode.length > 0) {
      await Auth.confirmSignUp(email, authCode)
        .then(() => {
          navigation.navigate('SignIn');
        })
        .catch((err) => {
          if (!err.message) {
            setError('Something went wrong, please contact support!');
          } else {
            setError(err.message);
          }
        });
    } else {
      setError('You must enter confirmation code');
    }
  };

    return (
    <View style={styles.container}>
      <Text>Check your email for the confirmation code.</Text>
      <TextInput
        value={authCode}
        placeholder="123456"
        onChangeText={(text) => setAuthCode(text)}
      />
      <Button onPress={() => confirmSignUp()} title='Confirm Sign Up' />
      <Text>{error}</Text>
    </View>
  );
}

export default ConfirmationScreen;