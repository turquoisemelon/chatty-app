const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create the WebSockets server
const wss = new SocketServer({ port: PORT });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (client) => {
  console.log('Client connected');
  //
  // client.on('message', (message) => {
  //   console.log('message from the server: ', message);
  // })

  client.on('message', (rawMessage) => {
    const message = JSON.parse(rawMessage);
    console.log('received message:', message);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => console.log('Client disconnected'));
});
