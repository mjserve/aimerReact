import React, {Component} from 'react';
import Select from 'react-select';
import './session_design.css';

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
            play_time : '',
            scen_type_list: [],
            scen_name_list: [],
            label_val_list: [],
            testing_scen: '',
            scen_score_placeholder: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectOnChange = this.selectOnChange.bind(this);

    }

    componentDidMount(){
      console.log('Add sceneario mounted');
      console.log(this.props.typeList);

      let label_val_list = [];

      this.props.typeList.map(scenarioType => {
        var tempObj = {
          "label" : scenarioType.name,
          "value" : scenarioType.name
        }

        label_val_list.push(tempObj);
      })

      this.setState({label_val_list}, () => console.log('Updated label/value list...'));
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

  /**
   * 
   * Sets scen_name and the correct scen_score_placeholder prior to form submission
   */
  selectOnChange(currentOption) {
    console.log(currentOption);
  
    let scen_template = '';

    this.props.typeList.map(scenario => {
      if (scenario.name === currentOption.value) {
        scen_template = scenario.score_template;
      }
    });

    this.setState({
      scen_name: currentOption.value,
      scen_score_placeholder: scen_template
    });
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
      <div class="border border-dark rounded add_scenario_box">
        <div class="form_box">
          <br></br>
          <br></br>
          <h3 >Enter scenario stats : </h3>
          <div >
            <form onSubmit={this.handleSubmit}>
              <p><label>Choose a scenario: </label>
                <Select
                  name='testing_scen'
                  options={this.state.label_val_list}
                  onChange={this.selectOnChange}
                />
              </p>
              <p><label>
                Score:
              <br></br>
                <input type="text" name="score_total" placeholder={this.state.scen_score_placeholder} onChange={this.handleChange} />
              </label></p>
              <p><label>
                Time Played:
              <br></br>
                <input type="text" name="play_time" placeholder="X min" onChange={this.handleChange} />
              </label></p>
              <input class="btn" type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default Add_scenario;