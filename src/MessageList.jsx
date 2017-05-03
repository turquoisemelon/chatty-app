import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {
          this.props.messages.map(chatObj => <Message index= {chatObj.id} chattyUsername= {chatObj.username} chattyMessage={chatObj.content} />)
        }
        <div className="message system">

        </div>
      </main>
    );
  }
}

export default MessageList;
