import React, {Component} from 'react';
import './messages.css';

class Messages extends Component {

    constructor(){
        super();
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/posts/')
            .then(res => res.json())
            .then(messages => this.setState({messages}, () => console.log('Messages fetched...', messages)));
    }

  render() {
    return (
      <div>
          <h2>Messages</h2>
          <ul>
              {this.state.messages.map(message => 
                <li key={message._id}>{message.title} {message.description} {message.date}</li>)}
          </ul>
      </div>
    );
  }
}
export default Messages;
