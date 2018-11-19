import React, {Component} from 'react';

class RoomList extends Component {
	constructor(props){
		super(props);

		this.state = {
			rooms: [],
			newRoomName: ''
		}

		this.roomsRef = this.props.firebase.database().ref('rooms');
	}

	componentDidMount(){
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat( room )});
		})
	}

	createRoom(e){
		e.preventDefault();
		const newRoom = {
			name: this.state.newRoomName,
		};
		this.roomsRef.push(newRoom);
		this.setState({newRoomName: ''});
	}

	handleNewRoomChange(e){
		this.setState({newRoomName: e.target.value})
	}

	// handleNewRoomSubmit(e){
	// 	e.preventDefault();
	// 	this.setState({rooms: [...this.state.rooms, this.state.newRoom], newRoom: ''})
	// }

	render(){
		return (
			<div>
				{this.state.rooms.map( (room, index) =>
					<h4 key={index} onClick={() => this.props.getActiveRoom(room)} className={room === this.props.activeRoom ? 'active' : ''} >{room.name}</h4>
				)}
				<form onSubmit={(e) => this.createRoom(e)}>
					<input id='newRoomInput' type='text' placeholder='New Room' value={this.state.newRoomName} onChange={(e) => this.handleNewRoomChange(e)} />
					<input id='newRoomSubmit' type='submit' value='+'/>
				</form>
			</div>
		);
	}
}

export default RoomList;