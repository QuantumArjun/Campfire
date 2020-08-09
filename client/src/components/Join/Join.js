import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

//Update state to avoid double booking rooms 
//Create a App state


// function genRoom() {
//   var roomList = ["a", "b", "c"]
//   return roomList[Math.floor(Math.random() * roomList.length)]
// }


/*
Todo
- Fix room generation: only called once
- Randomize room codes (low to no chance of collision)
*/


export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [usedRooms, setUsedRooms] = useState([]);
  


  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">

        <section id="welcome">
          <h1></h1>
        <h1 className="heading">Scroll down to continue.</h1>
        </section>

        <section id="name">
          <h1 className="heading">What is your name?</h1>
          <div>
            <input placeholder="Name" className="joinInput" type="text" onChange={(event) => {
              setName(event.target.value)
              }
            } />
          </div>
        </section>

        <section id="choice">
          <Link to={`/setup?name=${name}`}>
            <button className={'button mt-20'} type="submit">Start a Campfire</button>
          </Link>

          <button className={'button mt-20'} type="submit">Join a Campfire</button>
        </section>

        <section id="secretword">
          <h1 className="heading">What is the Secret Word</h1>
          <div>
            <input placeholder="Name" className="joinInput" type="text" onChange={(event) => {
              setName(event.target.value)

              }
            } />
          </div>
          
          <Link to={`/setup?name=${name}`}>
          <button className={'button mt-20'} type="submit">Continue</button>
          </Link>
        </section>



        
      </div>
    </div>
  );
}

  
//genRoom(roomList)
//e => (!name || !room) ? e.preventDefault() : null