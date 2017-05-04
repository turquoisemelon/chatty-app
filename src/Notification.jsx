import React, { Component } from 'react';

class Notification extends Component {
  render() {
    return (
      <div class="message system">
        {this.props.content}
      </div>
    );
  }
}

export default Notification;
