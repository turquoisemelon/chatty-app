import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className="message" key={this.props.index}>
        <span className="message-username">{this.props.chattyUsername}</span>
        <span className="message-content">{this.props.chattyMessage}</span>
      </div>
    );
  }
}

export default Message;
