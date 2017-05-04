const SocketServer = require('ws').Server;
// Generate a v1 UUID (time-based)
const uuidV1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create the WebSockets server
const wss = new SocketServer({ port: PORT });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (client) => {
  console.log('Client connected');

  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      // if (client.readyState === SocketServer.OPEN) {
        client.send(JSON.stringify(data));
        console.log('data sent to client from servers');
      // }
    });
  };

  client.on('message', (rawMessage) => {
    const receivedMessage = JSON.parse(rawMessage);
    console.log('received message:', receivedMessage);
    switch(receivedMessage.message.type) {
      case "postNotification":
        receivedMessage.message.type = "incomingNotification"
        receivedMessage.message['id'] = uuidV1();
        wss.broadcast(receivedMessage);
        break;
      case "postMessage":
        receivedMessage.message.type = "incomingMessage";
        receivedMessage.message['id'] = uuidV1();
        console.log('id added message:', receivedMessage);
        wss.broadcast(receivedMessage);
        break;
      default:
        throw new Error(`Unknown event type: ${receivedMessage.message.type}`)
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => console.log('Client disconnected'));
});
