import React, { Component } from 'react';
import QuestionForm from './QuestionForm'
import './index.css';

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
        };
    }

    toggleQuestion = (e) => {
        this.setState(prevState => ({ hidden: !prevState.hidden }))
    }

    handleCancel = (e) => {
        this.setState({ hidden: true });
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
        .then(() => this.setState({ hidden: true, question: {} }));
    }

    render() {
        const { question } = this.props;
        const { hidden, success, error } = this.state;
        return question ? (
                <QuestionForm 
                    hidden={this.state.hidden}
                    success={this.state.success}
                    error={this.state.error}
                    question={question}
                    onSubmit={this.handleSubmit} 
                    onDelete={this.handleDelete}
                    onCancel={this.handleCancel}
                    onHeaderClick={this.toggleQuestion}
                />
        ) : null;
    }
}