import React, { Component } from 'react';
import WorkSession from './workSession';
import Comparison from './comparison';
import './session_design.css';

class WorkSession_list extends Component {

  constructor() {
    super();
    this.state = {
      workSessions: [],
      compSeshList: [],
      compObject: {
        sharedScenarios: []
      },
      //Remove title and description if not used
      title: '',
      description: '',
      counter: 0,
      displayComps: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeWorkSession = this.removeWorkSession.bind(this);
    this.handleCompare = this.handleCompare.bind(this);
    this.headerTester = this.headerTester(this);
  }

  refreshPage() {
    window.location.reload(false);
  }

  componentDidMount() {
    fetch('http://localhost:5000/workSessions/')
      .then(res => res.json())
      .then(workSessions => {
        workSessions.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });

        this.setState({ workSessions }, () => console.log('WorkSessions fetched...', workSessions));
      }
      );
    console.log(this.state);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    //event.preventDefault();

    console.log('In addSession handle method...');
    var workSession = {}

    fetch('http://localhost:5000/workSessions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      /*Use created JSON here */
      body: JSON.stringify(workSession),
    })
      .then((response) => response.json())
      .then((data) => {
        //SetState of using another fetch statement here
        //Hopefully will solve the issue of rendering correct list after clicking Add Worksession
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  removeWorkSession() {
    console.log('In removeWorkSession');

    fetch('http://localhost:5000/workSessions/')
      .then(res => res.json())
      .then(workSessions => {
        workSessions.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });

        this.setState({ workSessions }, () => console.log('WorkSessions fetched...', workSessions));
      }
      );

  }

  /*
    Adds selected workSession to queue for comparison
  */
  handleCompare(workSession_id) {
    console.log('In handle compare');
    var compareList = this.state.compSeshList;

    if (compareList.length > 1) {
      //Remove earliest session added to make room for newly clicked session
      compareList.shift();
    }

    compareList.push(workSession_id);

    this.setState({ compSeshList: compareList });

    console.log('Current compSeshList val in state: ' + this.state.compSeshList + ', ' + this.state.compSeshList.length);

    //Display the Comparison component if there are sessions to compare
    if (this.state.compSeshList.length > 0) {
      this.setState({ displayComps: true });
    }

  }

  //Test method, delete
  headerTester() {
    console.log(this.state.compSeshList);
    var list = this.state.compSeshList;

    return (
      <div>
        <h3>Hummer dude</h3>
        <div>
          {this.state.compSeshList.map(session =>
            <h5>{session}</h5>
          )}
        </div>
        <button type="button" class="btn btn-secondary" >Compare!</button>
      </div>

    );
  }

  compareTwoSessions = () => {
    console.log('In compareTwoSessions');

    //Only do compares for if 2 items are selected
    if (this.state.compSeshList.length == 2) {
      var session_1 = this.state.compSeshList[0];
      var session_2 = this.state.compSeshList[1];
      var endpoint = 'http://localhost:5000/workSessions/' + session_1 + '/' + session_2;

      console.log('Endpoint: ' + endpoint);



      fetch(endpoint)
        .then(res => res.json())
        .then(comboSesh => {
          console.log(comboSesh);
          this.setState({ compObject: comboSesh }, () => console.log('Setting compObject state...'));
        }
        )
        ;
    }

  }

  render() {
    return (
      <div class="flex-container">
        <div class="flex-child-message">
          <ul>
            {this.state.workSessions.map(workSession =>
              <li key={workSession._id}>
                <WorkSession dataFromParent={workSession} deletePress={this.removeWorkSession} addToCompare={this.handleCompare} />
              </li>)}

          </ul>
          <div>
            <form onSubmit={this.handleSubmit}>
              <button type="submit">Add WorkSession</button>
            </form>
          </div>
        </div>

        <div class="flex-child">
          <div>
            <table class="table table-dark" >
              <thead>
                <tr>
                  <th>Scenario Name</th>
                  <th>Score 1</th>
                  <th>Time Played 1</th>
                  <th>Score 2</th>
                  <th>Time Played 2</th>
                </tr>
              </thead>
              <tbody>
                {this.state.compObject.sharedScenarios.map(scenario =>
                  <tr>
                    <td>{scenario.name}</td>
                    <td>{scenario.score_1}</td>
                    <td>{scenario.time_1}</td>
                    <td>{scenario.score_2}</td>
                    <td>{scenario.time_2}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div>
            <h3>Select 2 work sessions to compare: </h3>
            <div>
              {this.state.compSeshList.map(session =>
                <h5>{session}</h5>
              )}
            </div>
            <button type="button" class="btn btn-secondary" onClick={this.compareTwoSessions} >Compare!</button>
          </div>
        </div>
      </div>
    );
  }
}
export default WorkSession_list;