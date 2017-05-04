import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {
          this.props.messages.map( message => {
            if (message.type === 'incomingNotification') {
              return <Notification key={message.id}
                                   content={message.content}/>
            } else {
              return <Message key={message.id}
                              chattyUsername={message.username}
                              chattyMessage={message.content}/>
            }
          })
        }
      </main>
    );
  }
}

export default MessageList;
