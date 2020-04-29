import React, {Component} from 'react';
import './session_design.css';

class Comparison extends Component {

    constructor(){
        super();
        this.state = {
            
        };

    }

    componentDidMount() {


    }



    render() {
        return (
            <div>
                <h3>Hummer dude</h3>
            <div>
                {this.props.listOfSessions.map(session => 
                    <h5>{session}</h5>
                    )}
            </div>
                <button type="button" class="btn btn-secondary" >Compare!</button> 
            </div>
            
        );
    }

}

export default Comparison;