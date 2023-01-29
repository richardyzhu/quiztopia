import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {decode} from 'html-entities';

decode('&lt; &gt; &quot; &apos; &amp; &#169; &#8710;');
// -> '< > " \' & © ∆'
decode('&copy;', {level: 'html5'});
// -> '©'
decode('&copy;', {level: 'xml'});
// -> '&copy;'

class Question extends React.Component  {
    constructor(props) {
      super(props);
      this.state = {
        questionText: this.props.questionText,
        answers: this.props.answers,
        correctAnswer: this.props.correctAnswer,
        selectedAnswer: '',
      }
      this.updateQuestion = this.updateQuestion.bind(this);
    }

    onPress = (answer) => {
      this.setState({ selectedAnswer: answer });
      if(answer === this.state.correctAnswer){
          // correct answer
          setTimeout(() => {
              this.updateQuestion();
          }, 1500);
      }
      else{
          // incorrect answer
          setTimeout(() => {
              this.updateQuestion();
          }, 1500);
      }
      setTimeout(() => {
          this.setState({ selectedAnswer: ''});
      }, 1500);    
      
  }

  updateQuestion = async() => {

    const axios = require("axios");

    // getSessionToken() retrieves the session token for the trivia. This means that there wont be any repeats
    //    Need to call this function once every ~4000 questions to refresh the database
    //    Can save the token variable in a .env file
    async function getSessionToken() {
        return axios
        .get("https://opentdb.com/api_token.php?command=request")
        .then((res) => {
            const json = res.data;
            return json.token;
        });
      }
        const token =
    "7a1bbde5a97518935f5f00487ce6558290d69101b1b1e05db580c095e6aea949";

async function getTrivia(url) {
    const response = await axios.get(url);
    const json = response.data;
    return json;
}


async function fetchQuestion(token) {
    // console.log("TOKEN: " + token);
    const url =
        "https://opentdb.com/api.php?amount=1&type=multiple&token=" + token;

    const json = await getTrivia(url);

    if (json.response_code !== 0) {
        getSessionToken().then((token) => {
            fetchQuestion(token);
        });
    } else {
        return {
            difficulty: json.results[0].difficulty,
            question: json.results[0].question,
            correct_answer: json.results[0].correct_answer,
            incorrect_answers: json.results[0].incorrect_answers,
        };
    }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

    
const response_json = await fetchQuestion(token);
  let difficulty = response_json.difficulty;
  let givenQuestion = decode(response_json.question);
  let newArray = shuffle([].concat(response_json.incorrect_answers, response_json.correct_answer));
  let correctAnswer = decode(response_json.correct_answer);
    this.setState({ 
        questionText: givenQuestion,
        answers: newArray,
        correctAnswer: correctAnswer,
}
)}
    
    getButtonStyle = (answer) => {
        if (answer === this.state.correctAnswer) {
            if (this.state.selectedAnswer === this.state.correctAnswer) {
                return [styles.answerButton, styles.correctButton];
            } else if (this.state.selectedAnswer === '') {
                return styles.answerButton;
            } else {
                return [styles.answerButton, styles.correctButton];
            }
        } else if (answer === this.state.selectedAnswer) {
            return [styles.answerButton, styles.incorrectButton];
        } else {
            return styles.answerButton;
        }
    }
    
    render() {
        return (
            <><Text style={styles.questionText}>{this.state.questionText}</Text><View style={styles.answerButtonContainer}>
                {this.state.answers.map((answer, index) => (
                    <TouchableOpacity
                        key={index}
                        style={this.getButtonStyle(answer)}
                        onPress={() => this.onPress(answer)}>
                        <Text style={styles.buttonText}>{answer}</Text>
                    </TouchableOpacity>
                ))}
            </View></>
        )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },

    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    questionText: {
      textAlign: 'center',
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: '5%',
      marginLeft: '10%',
      marginRight: '10%'
    },
    answerButtonContainer: {
      alignItems: 'center',
      width: '100%',
      height: '20%',
      padding: 10,
      marginTop: '10%',
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
    correctButton: {
      backgroundColor: 'green',
    },
    incorrectButton: {
      backgroundColor: 'red',
    },
  });
  
  export default Question;