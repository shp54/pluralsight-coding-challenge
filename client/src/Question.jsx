import React, { Component } from 'react';
import { List, Input, Button  } from 'semantic-ui-react';
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
        .then(question => this.setState({ question }));
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
        const { question, hidden } = this.state;
        return question ? (
            <div>
                <div className='ui large header'
                    onClick={this.toggleQuestion}>
                    {question.question}
                </div>
                {!hidden && (<div className='editQuestion'>
                    <div className='ui medium header questionLabel'>Answer</div>
                    <Input value={question.answer} onChange={this.handleAnswerChange} /> 
                    <List>
                    <div className='ui medium header questionLabel'>Distractors</div>
                    {question.distractors.map((d, index) => ( 
                        <List.Item>
                            <Input value={d} onChange={e => this.handleDistractorChange(index, e.target.value)} />
                        </List.Item>
                    ))}    
                    </List>
                    <Button color='green' onClick={this.handleSubmit}>Submit</Button>
                    <Button color='red' onClick={this.handleDelete}>Delete</Button>
                </div>)}
            </div>
        ) : null;
    }
}