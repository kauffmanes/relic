import * as React from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import Auth from '@aws-amplify/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
});

function ForgetPassword({ navigation }) {
  const [email, onChangeEmail] = React.useState('');
  const [editableInput, setEditableInput] = React.useState(true);
  const [confirmationStep, setConfirmationStep] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const getConfirmationCode = async () => {
    if (email.length > 4) {
      Auth.forgotPassword(email)
        .then(() => {
          setEditableInput(true);
          setConfirmationStep(true);
          setErrorMessage('');
        })
        .catch((err) => {
          if (err.message) {
            setErrorMessage(err.message);
          }
        });
    } else {
      setErrorMessage('Provide a valid email');
    }
  };

  const postNewPassword = async () => {
    Auth.forgotPasswordSubmit(email, code, newPassword)
      .then(() => {
        setErrorMessage('');
        navigation.navigate('SignIn');
      })
      .catch((err) => {
        if (err.message) {
          setErrorMessage(err.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        placeholder="email@example.com"
        onChangeText={(text) => onChangeEmail(text)}
        editable={editableInput}
        autoCompleteType="email"
        autoCapitalize="none"
        autoFocus
        keyboardType="email-address"
      />
      <Button
        onPress={() => getConfirmationCode()}
        title='Reset password via email'
      />
      {confirmationStep && (
        <>
          <Text>Check your email for the confirmation code.</Text>
          <TextInput
            value={code}
            placeholder="123456"
            onChangeText={(text) => setCode(text)}
          />
          <Text>New password</Text>
          <TextInput
            value={newPassword}
            placeholder="password"
            onChangeText={(text) => setNewPassword(text)}
            secureTextEntry
            autoCompleteType="password"
          />
          <Button
            onPress={() => postNewPassword()}
            title='Submit new password'
          />
        </>
      )}
      <Text>{errorMessage}</Text>
    </View>
  );
}

export default ForgetPassword;