const users = [];
const rooms = [];
const colors = ["red", "blue", "green", "orange", "yellow", "purple"];

const addUser = ({ id, name, room, isHost }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  //choose rand color
  const random = Math.floor(Math.random() * colors.length);
  var color = colors[random];

  const user = { id, name, room, color, isHost };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  //Exchange host id user is host
  const index = users.findIndex((user) => user.id === id);
  
  
  // const currentUser = users.find((user) => user.id === id)
  // if (currentUser.isHost) {
  //   //true
  //   const roomName = currentUser.room;
  //   if(index !== -1) return users.splice(index, 1)[0];

  //   const getUsersInRoom = (room) => users.filter((user) => user.room === roomName);
  //   ifgetUsersInRoom[0].

  // } else {
  //   //false

  // }


  //if user is host -> replace them as host if other users exist in room
  

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const addRoom = ({ room, mode, topic, lowerwordlimit, higherwordlimit, storylength, timelimit} ) => {
  roomName = room.trim().toLowerCase();
  topic = topic;
  lowerwordlimit = lowerwordlimit;
  higherwordlimit = higherwordlimit;
  storylength = storylength;
  timelimit = timelimit;

  const newRoom = { roomName, mode, topic, lowerwordlimit, higherwordlimit, storylength, timelimit }; 

  rooms.push(newRoom);

  return { newRoom };
}

const getRoom = (roomName) => rooms.find((room) => room.roomName === roomName);

const advanceTurn = ({ room, mode, topic, lowerwordlimit, higherwordlimit, storylength, timelimit} ) => {
  roomName = room.trim().toLowerCase();
  topic = topic;
  lowerwordlimit = lowerwordlimit;
  higherwordlimit = higherwordlimit;
  storylength = storylength;
  timelimit = timelimit;

  const newRoom = { roomName, mode, topic, lowerwordlimit, higherwordlimit, storylength, timelimit }; 

  rooms.push(newRoom);

  return { newRoom };
}



/*
user {
  id,
  name,
  room,
}

room {
  roomName,
  params,
}
*/ 

//add user host property (transfer)

module.exports = { addUser, removeUser, getUser, getUsersInRoom, addRoom, getRoom, advanceTurn };