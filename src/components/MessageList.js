import React, {Component} from 'react';

class MessageList extends Component {
	constructor(props){
		super(props);

		this.state = {
			messages: []
		}

		this.messageRef = this.props.firebase.database().ref('messages');
	}

	componentDidMount(){
		this.messageRef.on('child_added', snapshot => {
			const message = snapshot.val();
			this.setState({ messages: this.state.messages.concat(message) });
		})
	}

	filterMessages(message, index){
		if(message.roomId === this.props.activeRoom.key){
			return (
				<div className='message' key={'msg' + index}>
					<p className='msgUsername'>{message.username}</p>
					<p className='msgTime'>{message.sentAt}</p>
					<p className='msgContent'>{message.content}</p>
				</div>
			)
		}
	}

	render(){
		return(
			<section id='messageList'>
				<h2>{this.props.activeRoom.name}</h2>
				{this.state.messages.map((message, index) => 
					this.filterMessages(message, index)
				)}
			</section>
		);
	}

}

export default MessageList;