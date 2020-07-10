import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Messages from './components/messages/messages';
import Message_list from './components/messages_2.0/message_list';
import WorkSession_list from './components/workSessions/workSession_list';
import Header from './components/header';
import HighScores from './components/workSessions/highScores';
import WorkSession from './components/workSessions/workSession';
import Navigation from './components/Navigation';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component {

/** 
 * <BrowserRouter>
        <Switch>
          <Route path="/" component={WorkSession_list}/>
        </Switch>
      </BrowserRouter>
*/

  render() {
    return (
      <BrowserRouter>
        <div class="border border-dark rounded">
          <Header />
          <Navigation />
          <Switch>
            <Route path="/" component={WorkSession_list} exact />
            <Route path="/highScores" component={HighScores} />
          </Switch>
        </div>
      </BrowserRouter>


    );
  }

}
export default App;
