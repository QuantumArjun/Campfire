import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

//Update state to avoid double booking rooms 
//Create a App state


// function genRoom() {
//   var roomList = ["a", "b", "c"]
//   return roomList[Math.floor(Math.random() * roomList.length)]
// }

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [usedRooms, setUsedRooms] = useState([]);
  var roomList = ["a", "b", "c"];

  const genRoom = () => {
    var bool1 = true;
    var count = 0;
    while(bool1 && count < 10) {
      var chosenRoom = roomList[Math.floor(Math.random() * roomList.length)];

      console.log(!usedRooms.includes(chosenRoom))
      console.log("CHosen:" + chosenRoom)
      console.log("Used" + usedRooms)
      
      if (!usedRooms.includes(chosenRoom)) {
        console.log("I made it!")
        //usedRooms.push(chosenRoom);
        setUsedRooms([...usedRooms, chosenRoom]);
        setRoom(chosenRoom);
        bool1 = false;
      }
      count++;
    }
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>

        <Link onClick={genRoom} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>

        
      </div>
    </div>
  );
}


//genRoom(roomList)
//e => (!name || !room) ? e.preventDefault() : null