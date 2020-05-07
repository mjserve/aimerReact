import React, { Component } from 'react';
import WorkSession from './workSession';
import Comparison from './comparison';
import './session_design.css';

class HighScores extends Component {

  constructor() {
    super();
    this.state = {
      list_of_highs: []
      }
    }

    componentDidMount() {
        //Fetch high scores into the state list_of_highs
      fetch('http://localhost:5000/workSessions/highs')
        .then(res => res.json())
        .then(list_of_highs => {    
          console.log(list_of_highs);
          this.setState({list_of_highs}, ()=> {'Setting list_of_highs'});
        }
        );
    }
  

    render() {
        return (
            <div>
                <table class="table table-dark" >
                    <thead>
                        <tr>
                            <th>Scenario Name</th>
                            <th>Most Targets Hit</th>
                            <th>Highest Accuracy</th>
                            <th>Lowest TTK</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list_of_highs.map(scenario =>
                            <tr>
                                <td>{scenario.name}</td>
                                <td>{scenario.targets ? scenario.targets : 'N/A'}</td>
                                <td>{scenario.percentage ? scenario.percentage.concat('%') : 'N/A'}</td>
                                <td>{scenario.ttk ? scenario.ttk.concat('s') : 'N/A'}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
      );
    }
  }


 

export default HighScores;