import React, {Component} from 'react';
import Add_scenario from './add_scenario';
import './session_design.css';

class WorkSession extends Component {

    constructor(){
        super();
        this.state = {
            displayAddScenario: false,
            endpoint: 'http://localhost:5000/workSessions/',
            hasScenarioList: false,
            scenarioList: [],
            prettyDate: ''
        };

    }

    componentDidMount() {
        var finalEndpoint = this.state.endpoint.concat(this.props.dataFromParent._id);
        var dt = new Date(this.props.dataFromParent.date);
        var month = dt.getMonth() + 1;
        var tmpStrDate = month + '/' + dt.getDate() + '/' + dt.getFullYear();
        console.log(this.props.dataFromParent);
        
        if (this.props.dataFromParent.scenarioList.length > 0)
        {
            this.setState({hasScenarioList: true});
        }    
        
        var tmpHasScenarios = false;

        if(this.props.dataFromParent.scenarioList.length > 0)
        {
            tmpHasScenarios = true;
        }
        
        this.setState({
            endpoint: finalEndpoint,
            scenarioList: this.props.dataFromParent.scenarioList,
            hasScenarioList: tmpHasScenarios,
            prettyDate: tmpStrDate}, 
            () => {
            console.log('Endpoint within state is: ' + this.state.endpoint);
            console.log(this.state.scenarioList);
            console.log(this.state.hasScenarioList);
        });
        
    }

    showAddScenario = () => {
        console.log("showAddScenario called");
        this.setState({
            displayAddScenario: !this.state.displayAddScenario
        });

        fetch(this.state.endpoint)
            .then(res => res.json())
            .then(workSession => {
                console.log('In showAddScenario');
                console.log(workSession);
                this.setState({scenarioList: workSession.scenarioList,
                               hasScenarioList: true},
                     () => {
                    console.log(this.state.scenarioList);
                    console.log(this.state.displayAddScenario);
                })
            });
    }


    render() {
        return (
           
            <div class="flex-container">

                <div class="flex-child-message tbl_data">
                    <div>
                        <p align="left">
                            <h3>{this.state.prettyDate}</h3> <br></br>
                        </p>
    <table class="table table-dark" >
    <thead>
        <tr>
            <th>Scenario Name</th>
            <th>Score</th>
            <th>Time Played</th>
        </tr>
    </thead>
    <tbody>
    {this.state.scenarioList.map(scenario => 
        <tr>
            <td>{scenario.scenario_name}</td>
            <td>{scenario.score}</td>
            <td>{scenario.timePlayed}</td>
        </tr>     
        )}
    </tbody>
</table>
                        
                         <button type="button" class="btn btn-secondary" onClick={this.showAddScenario}>Add a scenario</button> 
                    </div>
                </div>
  
                <div class="flex-child">
                    <div>
                        {this.state.displayAddScenario && <Add_scenario workSessionId={this.props.dataFromParent._id} callbackDisplay={this.showAddScenario} />}
                    </div>
                </div>
  
            </div>
            /*<div>
                 <p>
                    From Message Component...{this.props.dataFromParent.title} <br></br> 
                                             {this.props.dataFromParent.description} <br></br> 
                                             {this.props.dataFromParent.date} <br></br>
                                        
                    {this.state.hasFriends && 
                    <ul>
                    {this.state.friends.map(friend => 
                      <li key={friend.first_name}>
                        <p>{friend.first_name} {friend.last_name} {friend.job}</p>
                      </li>)}
          
                </ul>}
                </p>
                <button onClick={this.showAddFriend}>Add a friend</button> 
                <div>
                    {this.state.displayAddFriend && <Add_friend messageId={this.props.dataFromParent._id} callbackDisplay={this.showAddFriend} />}
                </div>
            </div>*/
        );
    }

}

export default WorkSession;