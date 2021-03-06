import React, {Component} from 'react';
import Message from './message';

class Message_list extends Component {

    constructor(){
        super();
        this.state = {
            messages: [],
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
        fetch('http://localhost:5000/posts/')
            .then(res => res.json())
            .then(messages => {
              messages.sort(function(a, b){
                return new Date(b.date) - new Date(a.date);
              });

              this.setState({messages}, () => console.log('Messages fetched...', messages));
            }
              );
        console.log(this.state);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
      //event.preventDefault();
      
      var message = {
        title: this.state.title,
        description: this.state.description
      }

      fetch('http://localhost:5000/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        /*Use created JSON here */
       body: JSON.stringify(message),
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
                  {this.state.messages.map(message => 
                    <li key={message._id}>
                      <Message dataFromParent = {message}/>
                    </li>)}
        
              </ul>
              <div>
                  <form  onSubmit={this.handleSubmit}>
                    <p><label for="title">Enter title: </label>
                    <input id="title" type="text" name="title" placeholder="title" onChange={this.handleChange}/></p>
                    <p><label for="description">Enter description : </label>
                    <input id="description" type="text" name="description" placeholder="description" onChange={this.handleChange}/></p>
                    <button type="submit">Add Message</button>
                </form>
              </div>
          </div>
        );
      }
    }
    export default Message_list;