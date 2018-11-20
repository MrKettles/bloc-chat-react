import React, {Component} from 'react';



class User extends Component {
	constructor(props){
		super(props);

		this.state = {
			user: ''
		}
	}

	componentDidMount(){
		this.props.firebase.auth().onAuthStateChanged( user => {
			this.props.setUser(user);
			this.setState({ user: user });
		})
	}

	signIn(){
		var provider = new this.props.firebase.auth.GoogleAuthProvider();

		this.props.firebase.auth().signInWithPopup(provider);

	   	this.props.firebase.auth().onAuthStateChanged( user => {
			this.props.setUser(user);
			this.setState({ user: user });
		})
	}

	signOut(){
		this.props.firebase.auth().signOut();
		this.setState({ user: '' });
	}

	render(){
		return (
			<section id='userSection' onClick={this.state.user ? () => this.signOut() : () => this.signIn() } >
				<ion-icon name='person'></ion-icon> 
				{this.state.user ? <p>{this.props.user.displayName}<br/><i>Sign Out</i></p> : <p>Guest<br/><i>Sign In</i></p>}
			</section>
		);
	}
}

export default User;