import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Question from './Question'

class QuestionManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionText: 'Why did Richard go to class?',
            answers: ['Go to class', 'Eat lunches', 'Take a dump', 'None of the above'],
            correctAnswer: 'Go to class'
        }
        this.updateQuestion = this.updateQuestion.bind(this);
    }
    updateQuestion = () => {
        // code to generate new question and answers
        console.log("updating question");
        const randomNumber = Math.floor(Math.random() * 10);
        this.setState({ 
            questionText: 'This is a new question!',
            answers: [randomNumber, 'Answer 2', 'Answer 3', 'Answer 4'],
            correctAnswer: 'Answer 3',
    }
    )}
        
    render() {
        return (
            <Question
                questionText={this.state.questionText}
                answers={this.state.answers}
                correctAnswer={this.state.correctAnswer}
                updateQuestion={this.updateQuestion}
            />
        )
    }
}

export default QuestionManager;
