import React, { useState } from 'react';
import { Link } from "react-router-dom";
import iro from '@jaames/iro';


import './Join.css';
import { AutoHideFollowButton } from 'react-scroll-to-bottom';

//Section as a component
function revealSection()
{
  document.getElementById("secretword").classList.add("visible");
  document.getElementById("secretword").classList.remove("reveal-if-active");
}

var colorPicker = new iro.ColorPicker("#picker", {
  // Set the size of the color picker
  width: 320,
  // Set the initial color to pure red
  color: "#f00"
});


var hex = colorPicker.color.hexString;

export default function Join() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [room, setRoom] = useState('');

  colorPicker.on('color:change', function(color) {
  // log the current color as a HEX string
  setColor(color.hexString);
  console.log(color.hexString);
});
  
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
              setName(event.target.value)}} onKeyPress={(e) => {handleUserInput(e, 'colpick')}} />
            <a href="#colpick"><button className={'button'} type="submit" tabIndex = "1">continue</button></a>
          </div>
        </section>

        <section id="colpick">
          <h1 className="heading">pick a color</h1>
          <div>
          <div id="picker"></div>
            <a href="#choice"><button className={'button'} type="submit" tabIndex = "3">continue</button></a>
          </div>
        </section>

        <section id="choice">
          <div className="bubblecontain">
          {/* <Link to={`/setup?name=${name}color=${color}`}> */}
          <Link to={ {pathname: '/setup', state: { name, color }}}>
            <button className={'button'} type="submit" tabIndex = "4">start a campfire</button>
          </Link>
          <button className={'button'} type="submit" onClick={revealScroll} tabIndex="5">join a campfire</button>
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
          <Link to={ {pathname: '/lobby', state: { name, color, room }}}>
            <button className={'button mt-20'} type="submit"> Continue </button>
          </Link>
        </section>
      </div>
  );
}

