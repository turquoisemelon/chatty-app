const SocketServer = require('ws').Server;
// Generate a v1 UUID (time-based)
const uuidV1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create the WebSockets server
const wss = new SocketServer({ port: PORT });
const onlineUsers= {counter: 0};

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (client) => {
  console.log('Client connected');
  // console.log('wss.clients object: ', wss.clients)
  if(client) {
    onlineUsers.counter++
    console.log(onlineUsers.counter);
  };


  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      // if (client.readyState === SocketServer.OPEN) {
      client.send(JSON.stringify(data));
      console.log('data sent to client from server');
      // }
    });
  };
  wss.broadcast(onlineUsers);

  function assignColor(message) {
    const colorArray = ['#0000FF', '#7FFF00', '#00FFFF', '#8B008B', '#FFD700', '#CD5C5C'];
  }

  client.on('message', (rawMessage) => {
    const receivedMessage = JSON.parse(rawMessage);
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
  client.on('close', () => {
    console.log('Client disconnected');
    onlineUsers.counter--;
    wss.broadcast(onlineUsers);
  });
});
