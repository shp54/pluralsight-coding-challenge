import React, { Component } from 'react';
import { List, Input, Button, Message  } from 'semantic-ui-react';
import './index.css';

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question,
            hidden: true,
        };
    }

    toggleQuestion = (e) => {
        this.setState(prevState => ({ hidden: !prevState.hidden }))
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

    handleSubmit = () => {
        const { question } = this.state;
        fetch(`/questions/${question.id}`, {
            method: 'PUT',
            body: JSON.stringify(question),
        })
        .then(response => response.json())
        .then(question => this.setState({ success: true, question }))
        .catch(() => this.setState({ error: true }));
    }

    handleDelete = () => {
        const { question } = this.state;
        fetch(`questions/${question.id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => this.setState({ question: null }));
    }

    render() {
        const { question, hidden, success, error } = this.state;
        return question ? (
            <div className={'question ' + (hidden ? 'hidden' : 'active')}>
                <div className='ui medium header questionHeader'
                    onClick={this.toggleQuestion}>
                    {question.question}
                </div>
                {success && <Message header='Update successful!' color='green' onDismiss={e => this.setState({ success: false })} /> }
                {error && <Message header='Update failed' color='red' onDismiss={e => this.setState({ error: false })} /> }
                {!hidden && (
                <div className='editQuestion'>
                    <div className='ui middle aligned grid'>
                    <div className='four wide column'>
                    <div className='ui medium header questionLabel'>Answer</div>
                    <Input value={question.answer} onChange={this.handleAnswerChange} /> 
                    </div>
                    <div className='four wide column'>
                    <List>
                    <div className='ui medium header questionLabel'>Distractors</div>
                    {question.distractors.map((d, index) => ( 
                        <List.Item>
                            <Input value={d} onChange={e => this.handleDistractorChange(index, e.target.value)} />
                        </List.Item>
                    ))}    
                    </List>
                    </div>
                    </div>
                    <Button color='green' onClick={this.handleSubmit}>Submit</Button>
                    <Button color='red' onClick={this.handleDelete}>Delete</Button>
                </div>
            )}
            </div>
        ) : null;
    }
}