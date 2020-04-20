import React, {Component} from 'react';

class Add_scenario extends Component {

    constructor(){
        super();
        
        this.state = {
            endpoint : 'http://localhost:5000/workSessions/',
            testObj : {
              first_name : 'Matt',
              last_name : 'Servello',
              job : 'Doctor Pottie'
            },
            scen_name : '',
            score_total : '',
            play_time : ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit(event) {
      var scenarioToAdd = {
        scenario_name : this.state.scen_name,
        score : this.state.score_total,
        timePlayed : this.state.play_time
      }
      console.log('Scenario to add:');
      console.log(scenarioToAdd);
      event.preventDefault();

      fetch('http://localhost:5000/workSessions/'.concat(this.props.workSessionId), {
        method: 'PATCH', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        /*Use created JSON here */
       body: JSON.stringify(scenarioToAdd),
      })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      this.props.callbackDisplay();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    }

    patchTest = () => {
      console.log("In patchTest");

      fetch('http://localhost:5000/posts/'.concat(this.props.workSessionId), {
        method: 'PATCH', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        /*Use created JSON here */
       body: JSON.stringify(this.state.testObj),
      })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      this.props.callbackDisplay();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    }


    render() {
        return (
          <div>
            <h3>This path is : </h3>
            <h3>{this.state.testObj.first_name} {this.state.testObj.last_name}</h3>
            <div>
      <form onSubmit={this.handleSubmit}>
        <p><label>
          First:
          <input type="text" name="scen_name" onChange={this.handleChange} />
        </label></p>
        <p><label>
          Last:
          <input type="text" name="score_total" onChange={this.handleChange} />
        </label></p>
        <p><label>
          Jobby:
          <input type="text" name="play_time" onChange={this.handleChange} />
        </label></p>
        <input type="submit" value="Submit" />
      </form>
            <button onClick={this.patchTest}>Submit Test Data</button>
          </div>
          </div>
          
        );
      }
}

export default Add_scenario;