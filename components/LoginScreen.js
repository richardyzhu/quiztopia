import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Client, Account, ID } from "appwrite";

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('63d5326b15e8272efde2');
    
    const account = new Account(client);

    account.create(
      ID.unique(),
      username,
      password,
    ).then(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });


    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.header}>Username:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <Text style={styles.header}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: '30%', 
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  submitButton: {
    backgroundColor: '#7b8d9d',
    padding: 10,
    margin: 30,
    width: 150,
    alignItems: 'center',
    borderRadius: 5,
  },
};

export default LoginScreen;