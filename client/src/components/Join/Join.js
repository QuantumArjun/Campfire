import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

//Update state to avoid double booking rooms 
//Create a App state


// function genRoom() {
//   var roomList = ["a", "b", "c"]
//   return roomList[Math.floor(Math.random() * roomList.length)]
// }

function revealSection()
{
  document.getElementById("secretword").classList.add("visible");
  document.getElementById("secretword").classList.remove("reveal-if-active");
  // document.getElementById("secretword").style.display = "initial";
}

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
    <div class="joinContainer">
        <section id="welcome">
        <h1>welcome to</h1>
        <h1 id="title">Campfire</h1>
          <div className="welcomebg">
          </div>
          <h3>scroll down to continue.</h3>
        </section>

        <section id="name">
          <h1 className="heading">what is your name?</h1>
          <div>
            <input placeholder="Name" className="joinInput" type="text" onChange={(event) => {
              setName(event.target.value)
              }
            } />
            <a href="#choice"><button className={'button'} type="submit">continue</button></a>
          </div>
        </section>

        <section id="choice">
          <div className="bubblecontain">
          <Link to={`/setup?name=${name}`}>
            <button className={'button'} type="submit">start a campfire</button>
          </Link>
          <button className={'button'} type="submit" onClick={revealSection}>join a campfire</button>
        </div>
        </section>

        <section id="secretword" className="reveal-if-active">
          <h1 className="heading">what is the secret word</h1>
          <div>
            <input placeholder="Name" className="joinInput" type="text" onChange={(event) => {
              setRoom(event.target.value)

              }
            } />
          </div>
          
          <Link to={`/Lobby?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">continue</button>
          </Link>
        </section>
      </div>
  );
}

  
//genRoom(roomList)
//e => (!name || !room) ? e.preventDefault() : null