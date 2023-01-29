import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import Question from './components/Question';
import LeaderboardScreen from './components/LeaderboardScreen';
import LoginScreen from './components/LoginScreen';


DATABASE_ID = '63d55c9825fa4c6999df';
COLLECTION_ID = '63d56bdd20045447a7ee';



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
        <Question questionText='Why did Richard go to class?'
                  answers={['Go to class', 'bob', 'Take a dump', 'None of the above']}
                  correctAnswer='bob'/>}
      {currentScreen === 'leaderboard' && <LeaderboardScreen />}
      {currentScreen === 'login' && <LoginScreen />}
    </View>
  );
}

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
  },
  button: {
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ACD32',
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
    backgroundColor: '#9ACD32',
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 10,
  },
});


export default App;
