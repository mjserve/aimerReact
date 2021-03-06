import React, {Component} from 'react';
import Add_friend from './add_friend';
import './design.css';

class Message extends Component {

    constructor(){
        super();
        this.state = {
            displayAddFriend: false,
            endpoint: 'http://localhost:5000/posts/',
            hasFriends: false,
            friends: [],
            prettyDate: ''
        };

    }

    componentDidMount() {
        var finalEndpoint = this.state.endpoint.concat(this.props.dataFromParent._id);
        var dt = new Date(this.props.dataFromParent.date);
        var month = dt.getMonth() + 1;
        var tmpStrDate = month + '/' + dt.getDate() + '/' + dt.getFullYear();
        
        if (this.props.dataFromParent.friends.length > 0)
        {
            this.setState({hasFriends: true});
        }    
        
        var tmpHasFriends = false;

        if(this.props.dataFromParent.friends.length > 0)
        {
            tmpHasFriends = true;
        }
        
        this.setState({
            endpoint: finalEndpoint,
            friends: this.props.dataFromParent.friends,
            hasFriends: tmpHasFriends,
            prettyDate: tmpStrDate}, 
            () => {
            console.log('Endpoint within state is: ' + this.state.endpoint);
            console.log(this.state.friends);
            console.log(this.state.hasFriends);
        });
        
    }

    showAddFriend = () => {
        console.log("Show add friend called");
        this.setState({
            displayAddFriend: !this.state.displayAddFriend
        });

        fetch(this.state.endpoint)
            .then(res => res.json())
            .then(message => {
                console.log('In showAddFriend');
                console.log(message);
                this.setState({friends: message.friends,
                               hasFriends: true},
                     () => {
                    console.log(this.state.friends);
                    console.log(this.state.displayAddFriend);
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
            <th>First Name</th>
            <th>Last Name</th>
            <th>Job</th>
        </tr>
    </thead>
    <tbody>
    {this.state.friends.map(friend => 
        <tr>
            <td>{friend.first_name}</td>
            <td>{friend.last_name}</td>
            <td>{friend.job}</td>
        </tr>     
        )}
    </tbody>
</table>
                        
                         <button type="button" class="btn btn-secondary" onClick={this.showAddFriend}>Add a friend</button> 
                    </div>
                </div>
  
                <div class="flex-child">
                    <div>
                        {this.state.displayAddFriend && <Add_friend messageId={this.props.dataFromParent._id} callbackDisplay={this.showAddFriend} />}
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

export default Message;