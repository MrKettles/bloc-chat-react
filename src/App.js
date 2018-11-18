import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAnqJHfaxJe5PE03824xVfOv1SfOTDlCCs",
    authDomain: "ketterman-bloc-chat-react.firebaseapp.com",
    databaseURL: "https://ketterman-bloc-chat-react.firebaseio.com",
    projectId: "ketterman-bloc-chat-react",
    storageBucket: "ketterman-bloc-chat-react.appspot.com",
    messagingSenderId: "911256933261"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <section id='room-list'>
          <h1>Bloc Chat</h1>
          <RoomList firebase={firebase} />
        </section>
      </div>
    );
  }
}

export default App;
