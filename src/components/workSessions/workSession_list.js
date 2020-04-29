import React, {Component} from 'react';
import WorkSession from './workSession';
import Comparison from './comparison';
import './session_design.css';

class WorkSession_list extends Component {

    constructor(){
        super();
        this.state = {
            workSessions: [],
            compSeshList: [],
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
    }

    refreshPage() {
      window.location.reload(false);
    }

    componentDidMount() {
        fetch('http://localhost:5000/workSessions/')
            .then(res => res.json())
            .then(workSessions => {
              workSessions.sort(function(a, b){
                return new Date(b.date) - new Date(a.date);
              });

              this.setState({workSessions}, () => console.log('WorkSessions fetched...', workSessions));
            }
              );
        console.log(this.state);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
      //event.preventDefault();
      
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
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    };

    removeWorkSession(){
      console.log('In removeWorkSession');
      
      fetch('http://localhost:5000/workSessions/')
            .then(res => res.json())
            .then(workSessions => {
              workSessions.sort(function(a, b){
                return new Date(b.date) - new Date(a.date);
              });

              this.setState({workSessions}, () => console.log('WorkSessions fetched...', workSessions));
            }
              ); 

    }

    handleCompare(workSession_id){
      console.log('In handle compare');
      var compareList = this.state.compSeshList;

      if(compareList.length > 1)
      {
        //Remove earliest session added to make room for newly clicked session
        compareList.shift();
      }
  
      compareList.push(workSession_id);
    
      this.setState({compSeshList: compareList});

      console.log('Current compSeshList val in state: ' + this.state.compSeshList + ', ' + this.state.compSeshList.length);

      //Display the Comparison component if there are sessions to compare
      if (this.state.compSeshList.length > 0)
      { 
        this.setState({displayComps: true});
      }
    }

    render() {
        return (
          <div class="flex-container">
            <div class="flex-child-message">
              <ul>
                  {this.state.workSessions.map(workSession => 
                    <li key={workSession._id}>
                      <WorkSession dataFromParent = {workSession} deletePress = {this.removeWorkSession} addToCompare = {this.handleCompare}/>
                    </li>)}
        
              </ul>
              <div>
                  <form  onSubmit={this.handleSubmit}>
                    <button type="submit">Add WorkSession</button>
                </form>
                <button type="submit">Add WorkSession</button>
                <button type="button" class="btn btn-secondary" onClick={this.handleCompare}>Comp Test</button> 
              </div>
              </div>

             <div class="flex-child">
                    {this.state.displayComps && <Comparison listOfSessions = {this.state.compSeshList}/>}
             </div> 
          </div>
        );
      }
    }
    export default WorkSession_list;