import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


const chattyData = {
  currentUser: {name: "Bob"},
  messages: [] // messages coming from the server will be stored here as they arrive
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleInsertMessage = this.handleInsertMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = chattyData;
    this.componentDidMount = this.componentDidMount.bind(this);

    this.connection = new WebSocket("ws://localhost:3001");
  }

  sendMessage(message) {
    this.connection.send(JSON.stringify(message));
    console.log('message sent to the server from client');
  }

  handleInsertMessage = (message) => {
    console.log(message);
    if(this.state.currentUser.name !== message.username) {
      this.state.currentUser.name = message.username;
      const newNotification = {type: "postNotification", content: `${this.state.currentUser.name} has changed their name to ${message.username}`}
      console.log('newNotification: ', newNotification);
      this.sendMessage({message: newNotification})
    }
    // send message to server
      const newMessage = {type: "postMessage", username: message.username, content: message.content};
      console.log('newMessage: ', newMessage);
      this.sendMessage({message: newMessage})
  }

  componentDidMount() {
    this.connection.onopen = (event) => {
      console.log('Connected to server');
    }
    this.connection.onmessage = (event) => {
      // The socket event data is encoded as a JSON string.
      // This line turns it into an object
      const serverData = JSON.parse(event.data);
      console.log('data coming back from server: ', serverData);
      switch(serverData.message.type) {
        case "incomingMessage":
        break;
        case "incomingNotification":
        break;
        default:
        throw new Error("Unknown event type: " + serverData.message.type)
      }
      const serverDataArray =[];
      serverDataArray.push(serverData.message);
      // Add a new message to the list of messages in the data store
      // fetch all messages from server
      this.setState({messages: this.state.messages.concat(serverDataArray)});
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar handleInsertMessage={this.handleInsertMessage} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
