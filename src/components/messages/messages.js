import React, {Component} from 'react';
import './messages.css';

class Messages extends Component {

    constructor(){
        super();
        this.state = {
            messages: []
        }
    }

    refreshPage() {
      window.location.reload(false);
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
                <li key={message._id}>
                  <div>
                    <p>
                      {message.title} <br></br> {message.description} <br></br> {message.date} <br></br>
                      <h4>Conditional</h4>
                    </p>
                    <button>Button</button> 
                  </div>
                </li>)}
    
          </ul>
          <div>
              <form  action="http://localhost:5000/posts" method="post">
                <p><label for="title">Enter title: </label>
                <input id="title" type="text" name="title" placeholder="title"/></p>
                <p><label for="description">Enter description : </label>
                <input id="description" type="text" name="description" placeholder="description"/></p>
                <input onClick={this.refreshPage} type="submit" value="OK"/>
            </form>
          </div>
      </div>
    );
  }
}
export default Messages;
