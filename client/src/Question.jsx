import React, { Component } from 'react';
import QuestionForm from './QuestionForm';

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
        };
    }

    toggleQuestion = (e) => {
        this.setState(prevState => ({ hidden: !prevState.hidden }));
    }

    handleDistractorChange = (index, value) => {
        let newDistractors = [...this.state.question.distractors];
        newDistractors[index] = value;
        this.setState(prevState => ({
            question: {
                ...prevState.question,
                distractors: newDistractors
            },
        }));
    }

    handleAnswerChange = (e) => {
        e.persist()
        this.setState(prevState => ({ 
            question: { 
                ...prevState.question, 
                answer: e.target.value 
            }
        }));
    }

    handleSubmit = (question) => {
        fetch(`/questions/${question.id}`, {
            method: 'PUT',
            body: JSON.stringify(question),
        })
        .then(response => response.json())
        .then(question => this.setState({ success: true, question }))
        .catch(() => this.setState({ error: true }));
    }

    handleDelete = (question) => {
        fetch(`questions/${question.id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => this.props.onDelete(question));
    }

    render() {
        const { question } = this.props;
        const { hidden, success, error } = this.state;
        return question ? (
                <QuestionForm 
                    hidden={hidden}
                    success={success}
                    error={error}
                    question={question}
                    onSubmit={this.handleSubmit} 
                    onDelete={this.handleDelete}
                    onCancel={e => this.setState({ hidden: true })} 
                    onHeaderClick={this.toggleQuestion}
                />
        ) : null;
    }
}