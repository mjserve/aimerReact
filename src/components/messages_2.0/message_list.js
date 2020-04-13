import React, {Component} from 'react';
import Message from './message';

class Message_list extends Component {

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
        console.log(this.state);
    }

    render() {
        return (
          <div>
              <h2>Messages</h2>
              <ul>
                  {this.state.messages.map(message => 
                    <li key={message._id}>
                      <Message dataFromParent = {message}/>
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
    export default Message_list;