import React, { Component } from 'react';
import { List, Input, Button, Message  } from 'semantic-ui-react';
import './index.css';

export default class CreateQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: {
                question: '',
                answer: '',
                distractors: [],
            },
            hidden: true,
        };
    }

    addDistractor = () => {
        let newDistractors = [...this.state.question.distractors];
        newDistractors[newDistractors.length + 1] = '';
        this.setState(prevState => ({
            question: {
                ...prevState.question,
                distractors: newDistractors
            },
        }));
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

    handleQuestionChange = (e) => {
        e.persist()
        this.setState(prevState => ({ 
            question: { 
                ...prevState.question, 
                question: e.target.value 
            }
        }));
    }


    handleSubmit = () => {
        const { question } = this.state;
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
            <div className={'question active'}>
                <div className='ui medium header questionHeader'>
                    <Input onChange={this.handleQuestionChange} />
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
                    <Button color='blue' onClick={this.addDistractor}>Add Distractor</Button>
                    </div>
                    </div>
                    <Button color='green' onClick={this.handleSubmit}>Submit</Button>
                    <Button color='blue' onClick={this.handleCancel}>Cancel</Button>
                </div>
            )}
            </div>
        ) : (
            <Button color="blue" onClick={e => this.setState({ hidden: false })}>Create Question</Button>
        );
    }
}