import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Messages from './components/messages/messages';
import Message_list from './components/messages_2.0/message_list';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Message_list />
      </div>
    );
  }
}
export default App;
