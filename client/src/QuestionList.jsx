import React from 'react';
import { List } from 'semantic-ui-react';
import Question from './Question';
import './index.css';

const QuestionList = (props) => (
    <List className='questionList'>
        {props.questions.map(item => <Question question={item} key={item.id} />)}
    </List>
);

export default QuestionList;