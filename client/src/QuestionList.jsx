import React, { Component } from 'react';
import { Input, List } from 'semantic-ui-react';
import Question from './Question';
import CreateQuestion from './CreateQuestion';
import './index.css';

export default class QuestionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
        };
    }

    handleSearch = (e) => {
        const search = e.target.value;
        if (search !== '') {
        fetch(`/questions?search=${search}`)
            .then(response => response.json())
            .then(questions => {
                this.setState({ questions })
            })
        } else {
            this.setState({ questions: [] })
        }
    }

    handleDelete = (question) => {
        this.setState(prevState => ({ 
            questions: prevState.questions.filter(q => q.id !== question.id)
        }));
    }

    render() {
        const { questions } = this.state;

        return (
            <div>
                <div>
                    <Input onChange={this.handleSearch} size="large" placeholder="Search questions..." />
                </div>
                <CreateQuestion />
                <List className='questionList'>
                    {questions.map(item => <Question question={item} key={item.id} onDelete={this.handleDelete} />)}
                </List>
            </div>
        );
    }
}