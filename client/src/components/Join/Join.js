import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

//Section as a component
function revealSection()
{
  document.getElementById("secretword").classList.add("visible");
  document.getElementById("secretword").classList.remove("reveal-if-active");
}


export default function Join() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [usedRooms, setUsedRooms] = useState([]);
  
  function handleUserInput(e, name){
    if (e.key === 'Enter') {
        scrollTo(name);
    }
  }

  function scrollTo(name)
  {
      var element = document.getElementById(name).scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  function revealScroll()
  {
    revealSection();
    scrollTo('secretword');
  }

  return (
    <div className="joinContainer">
      <div id="aboutUs">hello lorem ipsum</div>
      <Link to={`/about`}><div className="infoCircle">i</div></Link>
        <section id="welcome">
        <h1>welcome to</h1>
        <h1 id="title">Campfire</h1>
          <div className="welcomebg">
          </div>
          <h3>press tab or scroll down to continue.</h3>
        </section>

        <section id="name">
          <h1 className="heading">what is your name?</h1>
          <div>
            <input placeholder="Name" tabIndex = "0" className="joinInput" type="text" onChange={(event) => {
              setName(event.target.value)}} onKeyPress={(e) => {handleUserInput(e, 'choice')}} />
            <a href="#choice"><button className={'button'} type="submit" tabIndex = "1">continue</button></a>
          </div>
        </section>

        <section id="choice">
          <div className="bubblecontain">
          <Link to={`/setup?name=${name}`}>
            <button className={'button'} type="submit" tabIndex = "2">start a campfire</button>
          </Link>
          <button className={'button'} type="submit" onClick={revealScroll} tabIndex="3">join a campfire</button>
        </div>
        </section>

        <section id="secretword" className="reveal-if-active">
          <h1 className="heading">what is the secret word</h1>
          <div>
            <input placeholder="Name" className="joinInput" type="text"  tabIndex = "4" 
              onChange={(event) => {setRoom(event.target.value)}} 
              // onKeyPress={(e) => {
              //   if (e.key === 'Enter') {
              //     console.log("s");
              //     // window.location.href = `/Lobby?name=${name}&room=${room}`;
              //   }}
              //}
            />
          </div>
          <Link to={ {pathname: '/lobby', state: { name, room }}}>
            <button className={'button mt-20'} type="submit"> Continue </button>
          </Link>
        </section>
      </div>
  );
}

