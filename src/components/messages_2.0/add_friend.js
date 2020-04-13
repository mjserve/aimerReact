import React, {Component} from 'react';

class Add_friend extends Component {

    constructor(){
        super();
        this.state = {
            messages: []
        }
    }

    render() {
        return (
          <div>
            <h3>This message ID : {this.props.messageId}</h3>
            <div>
              <form  action="http://localhost:5000/posts" method="post">
                <p><label for="first_name">Enter first name: </label>
                <input id="first_name" type="text" name="first_name" placeholder="First name"/></p>
                <p><label for="last_name">Enter last name : </label>
                <input id="last_name" type="text" name="last_name" placeholder="Last name"/></p>
                <p><label for="job">Enter job : </label>
                <input id="job" type="text" name="job" placeholder="Job"/></p>
                <input onClick={this.refreshPage} type="submit" value="Confirm"/>
            </form>
          </div>
          </div>
          
        );
      }
}

export default Add_friend;