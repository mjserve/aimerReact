import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Messages from './components/messages/messages';
import Message_list from './components/messages_2.0/message_list';
import WorkSession_list from './components/workSessions/workSession_list';
import WorkSession from './components/workSessions/workSession';

class App extends Component {
  /*
  render() {
    return (
      <div className="App">
        {<header className="App-header">
          <h1 className="App-title">Welcome to Aim Tracker</h1>
        </header>}
        <Message_list />
      </div>
    );
  }*/

  render() {
    return (
      <div className="App">
        {<header className="App-header">
          <h1 className="App-title">Welcome to Aim Tracker</h1>
        </header>}
        
        <WorkSession_list />
        {/*<Message_list />*/}
      </div>
    );
  }

}
export default App;
