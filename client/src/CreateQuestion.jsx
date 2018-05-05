import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import QuestionForm from './QuestionForm';

export default class CreateQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
        };
    }

    handleSubmit = (question) => {
        fetch(`/questions`, {
            method: 'POST',
            body: JSON.stringify(question),
        })
        .then(response => response.json())
        .then(question => {
            this.setState({ hidden: true });
        })
        .catch(() => this.setState({ error: true }));
    }

    render() {
        const { question, hidden, success, error } = this.state;
        return !hidden ? (
            <QuestionForm 
                canEditQuestion
                onSubmit={this.handleSubmit} 
                onCancel={e => this.setState({ hidden: true })} 
                hidden={this.state.hidden} 
                error={this.state.error}
            />
        ) : (
            <Button color="blue" onClick={e => this.setState({ hidden: false })}>Create Question</Button>
        );
    }
}