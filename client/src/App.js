import React from 'react';
import { Container } from 'semantic-ui-react';
import QuestionList from './QuestionList';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

const App = () => (
  <div className="App">
    <Container textAlign="left">
      <div className='ui large header'>Question Database</div>
      <QuestionList />
    </Container>
  </div>
);

export default App;
