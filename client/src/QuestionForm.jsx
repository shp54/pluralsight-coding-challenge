import React, { Component } from 'react';
import { List, Input, Button, Message, Icon } from 'semantic-ui-react';
import './index.css';

export default class QuestionForm extends Component {
    static defaultProps = {
        canEditQuestion: false,
        hidden: true,
        question: {
            question: '',
            answer: '',
            distractors: [],
        },
        onSubmit() {},
        onCancel() {},
        onDelete() {},
        onHeaderClick() {},
    }
    
    constructor(props) {
        super(props);
        this.state = {
            question: props.question,
            hidden: props.hidden,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            question: nextProps.question,
            hidden: nextProps.hidden,
            success: nextProps.success,
            error: nextProps.error,
        });
    }

    addDistractor = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            question: {
                ...prevState.question,
                distractors: prevState.question.distractors.concat('')
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

    handleSubmit = e => this.props.onSubmit(this.state.question);

    handleDelete = e => this.props.onDelete(this.state.question);

    render() {
        const { question, hidden, success, error } = this.state;
        const { canEditQuestion } = this.props;
        const icon = hidden ? 'circle arrow down' : 'circle arrow up';
        return (
                <div className={'question ' + (hidden ? 'hidden' : 'active')} onClick={this.props.onHeaderClick}>
                <div className='ui medium header questionHeader'>
                    { canEditQuestion ? 
                        <Input onChange={this.handleQuestionChange} /> :
                        <span><Icon name={icon} />{question.question}</span> }
                </div>
                {success && <Message header='Update successful!' color='green' onClick={e => e.stopPropagation()} onDismiss={e => this.setState({ success: false })} /> }
                {error && <Message header='Update failed' color='red'  onClick={e => e.stopPropagation()} onDismiss={e => this.setState({ error: false })} /> }
                {!hidden && (
                    <div className='editQuestion' onClick={e => e.stopPropagation()}>
                        <div className='ui middle aligned grid'>
                            <div className='four wide column'>
                                <div className='ui medium header questionLabel'>Answer</div>
                                <Input value={question.answer} onChange={this.handleAnswerChange} /> 
                            </div>
                            <div className='four wide column'>
                                <List>
                                    <div className='ui medium header questionLabel'>Distractors</div>
                                    {question.distractors.map((d, index) => ( 
                                        <List.Item key={index}>
                                            <Input value={d} onChange={e => this.handleDistractorChange(index, e.target.value)} />
                                        </List.Item>
                                    ))}    
                                </List>
                                <Button color='blue' onClick={this.addDistractor}>Add Distractor</Button>
                            </div>
                        </div>
                        <div className='submitButtons'>
                            <Button color='green' onClick={this.handleSubmit}>Submit</Button>
                            { question.id && <Button color='red' onClick={this.handleDelete}>Delete</Button> }
                            <Button color='blue' onClick={this.props.onCancel}>Cancel</Button>
                        </div>
                    </div>
                )}
                </div>
        );
    }
}