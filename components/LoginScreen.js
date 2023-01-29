import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Client, Account, ID } from 'appwrite';

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("63d5326b15e8272efde2")
    .setKey(
        "05fe2d2072a82afdce35c676891deb6acc50bed11d937d6a99b1025c9956714ec5d1765852942657549f274352fb906e2de9c0be8690f51bf5f713ef1b69cbc8b5ee7d1dda511da1480f477239e63304a7e8136cabe8169b50015825d48bac0f1f9870f83e457bed38c81b3efd359af36341152fc90bb2aa080232990f3f8aab"
    );

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <View style={styles.container}>
      <Text>Username:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
};

export default LoginScreen;