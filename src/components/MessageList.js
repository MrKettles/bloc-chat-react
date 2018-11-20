import React, {Component} from 'react';

class MessageList extends Component {
	constructor(props){
		super(props);

		this.state = {
			messages: [],
			newMessageText: ''
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
					<p className='msgTime'>{this.convertDate(message.sentAt)}<b> {this.convertTime(message.sentAt)}</b></p>
					<p className='msgContent'>{message.content}</p>
				</div>
			)
		}
	}

	handleMessageChange(e){
		this.setState({ newMessageText: e.target.value })
	}

	handleMessageSubmit(e){
		e.preventDefault();
		console.log(this.props.user);
		if(this.props.user && this.props.activeRoom){
			const newMessage = {
				username: this.props.user.displayName,
				content: this.state.newMessageText,
				sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
				roomId: this.props.activeRoom.key
			}
			this.messageRef.push(newMessage);
			this.setState({ newMessageText: '' });
		} else if (!this.props.user && this.props.activeRoom) {
			alert('You must log in to send a message.');
		} else {
			alert('You must choose a chat room before sending a message.');
		}
	}

	convertTime(timestamp){
		const date = new Date(timestamp);
		let hour = date.getHours()%12 === 0 ? 12 : date.getHours()%12,
			min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
			am = date.getHours() < 12 ? 'am' : 'pm';

		return hour + ':' + min + ' ' + am;
	}

	convertDate(timestamp){
		const date = new Date(timestamp);
		let year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate();

		return month + '/' + day + '/' + year;
	}

	render(){
		return(
			<section id='messageList'>
				<h2>{this.props.activeRoom.name}</h2>
				{this.props.activeRoom ? 
					this.state.messages.map((message, index) => 
						this.filterMessages(message, index)
					) : <p id='chatSelect'>Select a chat room to start contributing!</p>
				}
				<form id='new-message' onSubmit={(e) => this.handleMessageSubmit(e)} >
					<input id='newMessageInput' type='text-field' placeholder='Write your message here...' autocomplete='off' value={this.state.newMessageText} onChange={(e) => this.handleMessageChange(e)} />
					<input id='newMessageSubmit' type='submit' value='Send' />
				</form>
			</section>
		);
	}

}

export default MessageList;