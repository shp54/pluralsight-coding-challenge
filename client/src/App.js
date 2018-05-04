import React, { Component } from 'react';
import { Input, Container, Button } from 'semantic-ui-react';
import QuestionList from './QuestionList';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  handleSearch = (e) => {
    const search = e.target.value;
    if (search !== '') {
      fetch(`/questions?search=${search}`)
        .then(response => response.json())
        .then(data => {
          this.setState({ data })
        })
    } else {
      this.setState({ data: [] })
    }
  }

  render() {
    return (
      <div className="App">
        <Container textAlign="left">
          <div className='ui large header'>Question Database</div>
          <div>
            <Input onChange={this.handleSearch} size="large" placeholder="Search questions..." />
          </div>
          <QuestionList questions={this.state.data} />
        </Container>
      </div>
    );
  }
}

export default App;
