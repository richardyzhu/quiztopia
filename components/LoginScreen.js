import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Client, Account, Id } from "appwrite";

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('63d5326b15e8272efde2');
    
    const account = new Account(client);

    account.createOAuth2Session('discord',
    'https://discord.com/api/oauth2/authorize?client_id=1069168038080954368&redirect_uri=https%3A%2F%2Fcloud.appwrite.io%2Fv1%2Faccount%2Fsessions%2Foauth2%2Fcallback%2Fdiscord%2F63d5326b15e8272efde2&response_type=code&scope=identify',
    );

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