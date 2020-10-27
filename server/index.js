const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom, addRoom, getRoom, advanceTurn } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
//What preferences are attached to each room 
// We want that to only be set by the host

app.use(cors());
app.use(router);

io.on('connect', (socket) => {

  //Todo
  //Then - Write an "advance turn" function called whenever a turn is advanced
  //Update Room prefs for every component 
  
  
   
  socket.on('create', ({name, room, mode, topic, lowerwordlimit, higherwordlimit, storylength, timelimit}, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room, isHost: true });
    const newRoom = addRoom({room, mode, topic, lowerwordlimit, higherwordlimit, storylength, timelimit, currPlayer: 0});
    if(error) return callback(error);

    socket.join(user.room);
    // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`}); //nuked
    // socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has joined!` });
    const test = "hi";

    io.to(user.room).emit('roomData', { users: getUsersInRoom(user.room)});

    callback(); 
  });

  socket.on('join', ({name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room, isHost: false });
    if(error) return callback(error);

    socket.join(user.room);
    //socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`}); //nuked
    //socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has joined!` });
    io.to(user.room).emit('roomData', { users: getUsersInRoom(user.room) });

    callback(); 
  });


  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    let room = user.room;
    currPlayer = advanceTurn(room)

    io.to(user.room).emit('message', { user: user.name, color: user.color, text: message });
    io.to(user.room).emit('advanceTurn', { currPlayer: currPlayer});

    callback();
  }); 


  socket.on('start', () => {
    const user = getUser(socket.id);
 
    io.to(user.room).emit('startSignal', {roomPrefs: getRoom(user.room)}); 
  }); 

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      // io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));