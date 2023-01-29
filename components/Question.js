import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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
    correctButton: {
      backgroundColor: 'green',
    },
    incorrectButton: {
      backgroundColor: 'red',
    },
  });

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
          }, 2000);
      }
      else{
          // incorrect answer
          setTimeout(() => {
              this.updateQuestion();
          }, 2000);
      }
      setTimeout(() => {
          this.setState({ selectedAnswer: ''});
      }, 2000);    
      
  }

  updateQuestion = () => {
    // code to generate new question and answers
    console.log("updating question");
    const randomNumber = Math.floor(Math.random() * 10);
    this.setState({ 
        questionText: 'This is a new question!',
        answers: [randomNumber, 'Answer 2', 'Answer 3', 'Answer 4'],
        correctAnswer: 'Answer 3'
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
  
  
  export default Question;
