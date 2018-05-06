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

    handleCancel = e => this.setState({ hidden: true });

    handleShowForm = e => this.setState({ hidden: false })

    render() {
        const { hidden, success, error } = this.state;
        return !hidden ? (
            <QuestionForm 
                canEditQuestion
                onSubmit={this.handleSubmit} 
                onCancel={this.handleCancel} 
                hidden={hidden} 
                success={success}
                error={error}
            />
        ) : (
            <Button color="blue" onClick={this.handleShowForm}>Create Question</Button>
        );
    }
}