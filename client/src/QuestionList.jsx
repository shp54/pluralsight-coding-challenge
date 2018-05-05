import React from 'react';
import { List } from 'semantic-ui-react';
import Question from './Question';
import CreateQuestion from './CreateQuestion';
import './index.css';

const QuestionList = (props) => (
    <List className='questionList'>
        <CreateQuestion />
        {props.questions.map(item => <Question question={item} key={item.id} />)}
    </List>
);

export default QuestionList;