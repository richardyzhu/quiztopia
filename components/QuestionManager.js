
import React from 'react';
import { View, Image, StyleSheet} from 'react-native';
import Question from './Question'

class QuestionManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionText: 'Welcome to Quiztopia!',
            answers: ['Play'],
            correctAnswer: 'Play',
            image: ''
        }
    }
        
    render() {
        return (
            <View style={styles.containter}>
                <Question
                    questionText={decodeURIComponent(this.state.questionText)}
                    answers={this.state.answers}
                    correctAnswer={this.state.correctAnswer}
                />
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containter: {
        alignItems: 'center',
        alignContent: 'center',
        width: '90%'
    },
});

export default QuestionManager;