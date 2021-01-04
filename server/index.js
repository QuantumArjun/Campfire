const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom, addRoom, getRoom, advanceTurn, updateGlobalWordCount } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
console.log("Created")

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  console.log("Connected");

  
   
  socket.on('create', ({name, color, room, mode, topic, lowerwordlimit, higherwordlimit, storylength, timelimit, wordcount}, callback) => {
    const { error, user } = addUser({ id: socket.id, name, color, room, isHost: true });
    const newRoom = addRoom({room, mode, topic, lowerwordlimit, higherwordlimit, storylength, timelimit, currPlayer: 0, wordcount});
    if(error) return callback(error);

    socket.join(user.room);
    // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`}); //nuked
    // socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has joined!` });
    const test = "hi";
    console.log(getUsersInRoom(user.room));

    io.to(user.room).emit('roomData', { users: getUsersInRoom(user.room)});

    callback(); 
  });

  socket.on('join', ({name, color, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, color, room, isHost: false });
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
    newLocalWC = message === "" ? 0 : message.split(" ").length;
    let newGlobalWC = updateGlobalWordCount(room, newLocalWC);

    io.to(user.room).emit('message', { user: user.name, color: user.color, text: message });
    io.to(user.room).emit('advanceTurn', { currPlayer: currPlayer});
    io.to(user.room).emit('newGlobalWC', { newWC: newGlobalWC});
    callback();
  }); 
  
  socket.on('start', () => {
    const user = getUser(socket.id);
 
    io.to(user.room).emit('startSignal', {roomPrefs: getRoom(user.room)}); 
    io.to(user.room).emit('newGlobalWC', { newWC: 0});
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