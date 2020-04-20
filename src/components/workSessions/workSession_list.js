import React, {Component} from 'react';
import WorkSession from './workSession';

class WorkSession_list extends Component {

    constructor(){
        super();
        this.state = {
            workSessions: [],
            //Remove title and description if not used
            title: '',  
            description: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    }

    render() {
        return (
          <div>
            
              <ul>
                  {this.state.workSessions.map(workSession => 
                    <li key={workSession._id}>
                      <WorkSession dataFromParent = {workSession}/>
                    </li>)}
        
              </ul>
              <div>
                  <form  onSubmit={this.handleSubmit}>
                    <button type="submit">Add WorkSession</button>
                </form>
              </div>
          </div>
        );
      }
    }
    export default WorkSession_list;