import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import LeaderboardScreen from './components/LeaderboardScreen';
import LoginScreen from './components/LoginScreen';
import QuestionManager from './components/QuestionManager';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    padding: 10,
    marginTop: '15%',
    marginLeft: '15%',
    marginRight: '15%',
    marginBottom: '15%',
    zIndex: '10',
  },
  button: {
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7b8d9d',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  questionText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: '5%'
  },
  answerButtonContainer: {
    alignItems: 'center',
    width: '100%',
    height: '20%',
    padding: 10,
    marginTop: '15%',
  },
  answerButton: {
    width: '90%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7b8d9d',
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  bulbImage: {
    height: 1000,
    width: 1000,
    position: 'absolute',
    zIndex: '-10',
  }
});


const App = () => {
  const [currentScreen, setCurrentScreen] = useState('question');

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setCurrentScreen('leaderboard')} style={styles.button}>
          <Text style={styles.buttonText}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('question')} style={styles.button}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('login')} style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
      {currentScreen === 'question' && 
        <QuestionManager />}
      {currentScreen === 'leaderboard' && <LeaderboardScreen />}
      {currentScreen === 'login' && <LoginScreen />}
      <Image source={require('./images/71.jpg')}
                        style={styles.bulbImage}/>
    </View>
  );
}

export default App;

