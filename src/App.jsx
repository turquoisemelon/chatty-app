import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


const chattyData = {
  currentUser: {username: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    { id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?"
    },
    { id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleInsertMessage = this.handleInsertMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = chattyData;

    this.connection = new WebSocket("ws://localhost:3001");
  }

  sendMessage(message) {
    this.connection.send(JSON.stringify(message));
    console.log('message sent to the server from client');
  }

  handleInsertMessage = (message) => {
    const newMessage = {id:3, username: message.username, content: message.content};
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages});
    // send message to server
    this.sendMessage({message: message})
  }

  componentDidMount() {
    // Add a new message to the list of messages in the data store

    // fetch all messages from server
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar handleInsertMessage={this.handleInsertMessage} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
