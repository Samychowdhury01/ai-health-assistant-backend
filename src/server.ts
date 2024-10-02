// import mongoose from 'mongoose';
// import config from './app/config';
// import app from './app';
// import { createServer } from 'http'; // Import the http module
// import { Server } from 'socket.io';  // Import Socket.IO

// const httpServer = createServer(app); // Create an HTTP server
// export const io = new Server(httpServer, {
//   cors: {
//     origin: '*', // Define the allowed origins for CORS (or set specific domains)
//   },
// });

// async function main() {
//   try {
//     await mongoose.connect(config.database_url as string);
//     // Socket.IO connection handler
//     io.on('connection', (socket) => {
//       console.log('A user connected');
      
//       // Example event listener
//       socket.on('message', (data) => {
//         console.log('Message received:', data);
//         // Broadcast the message to all connected clients
//         io.emit('message', data);
//       });

//       // Handle disconnection
//       socket.on('disconnect', () => {
//         console.log('A user disconnected');
//       });
//     });

//     httpServer.listen(config.port, () => {
//       console.log(`Server is listening on port ${config.port}`);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// main();



import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    // Socket.IO connection handler
    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);

      // Listen for user registration
      socket.on('register', (userId) => {
        socket.join(userId.toString());
        console.log(`${userId} has joined the room`);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
      });
    });

    httpServer.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
