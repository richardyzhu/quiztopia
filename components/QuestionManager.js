import React from 'react';
import Question from './Question'

class QuestionManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionText: 'Why did Richard go to class?',
            answers: ['Go to class', 'Eat lunches', 'Take a dump', 'None of the above'],
            correctAnswer: 'Go to class'
        }
    }
        
    render() {
        return (
            <Question
                questionText={this.state.questionText}
                answers={this.state.answers}
                correctAnswer={this.state.correctAnswer}
            />
        )
    }
}

export default QuestionManager;
