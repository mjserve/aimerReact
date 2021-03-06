import React, {Component} from 'react';

class Add_friend extends Component {

    constructor(){
        super();
        
        this.state = {
            endpoint : 'http://localhost:5000/posts/',
            testObj : {
              first_name : 'Matt',
              last_name : 'Servello',
              job : 'Doctor Pottie'
            },
            firstName : '',
            lastName : '',
            jobby : ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit(event) {
      var friendToAdd = {
        first_name : this.state.firstName,
        last_name : this.state.lastName,
        job : this.state.jobby
      }
      console.log(friendToAdd);
      event.preventDefault();

      fetch('http://localhost:5000/posts/'.concat(this.props.messageId), {
        method: 'PATCH', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        /*Use created JSON here */
       body: JSON.stringify(friendToAdd),
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

      fetch('http://localhost:5000/posts/'.concat(this.props.messageId), {
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
          <input type="text" name="firstName" onChange={this.handleChange} />
        </label></p>
        <p><label>
          Last:
          <input type="text" name="lastName" onChange={this.handleChange} />
        </label></p>
        <p><label>
          Jobby:
          <input type="text" name="jobby" onChange={this.handleChange} />
        </label></p>
        <input type="submit" value="Submit" />
      </form>
            <button onClick={this.patchTest}>Submit Test Data</button>
          </div>
          </div>
          
        );
      }
}

export default Add_friend;