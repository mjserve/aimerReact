import React, {Component} from 'react';
import Add_friend from './add_friend';

class Message extends Component {

    constructor(){
        super();
        this.state = {
            displayAddFriend: false
        };
    }

    componentDidMount() {
        console.log(this.props.dataFromParent);
    }

    showAddFriend = () => {
        console.log("Show add friend called");
        this.setState({
            displayAddFriend: !this.state.displayAddFriend
        })
    }


    render() {
        return (
            <div>
                 <p>
                    From Message Component...{this.props.dataFromParent.title} <br></br> {this.props.dataFromParent.description} <br></br> {this.props.dataFromParent.date} <br></br>
                    <h4>Conditional</h4>
                </p>
                <button onClick={this.showAddFriend}>Add a friend</button> 
                <div>
                    {this.state.displayAddFriend && <Add_friend messageId={this.props.dataFromParent._id} />}
                </div>
            </div>
        );
    }

}

export default Message;