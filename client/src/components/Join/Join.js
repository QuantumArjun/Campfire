import React, { useReducer, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
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
  const [fieldError, setFieldError] = useState({nameError:'', roomError:''});

  let history = useHistory();

  colorPicker.on('color:change', function(color) {
  // log the current color as a HEX string
  setColor(color.hexString);
});
  
  function handleUserInput(e, scrollName){   
    if (e.key === 'Enter') {
      let nameBool = validateName();
      if (nameBool===true){
        scrollTo(scrollName)
      }
      else{
        scrollTo("name")
      }
      
    }
  }
  
  function handleNameButton(event) {
    //handler for button click
    event.preventDefault();
    let formBool = validateName();
    if (formBool === true) {
      scrollTo("colpick");
    }
    else {
      scrollTo("name");
    }
  }

  function validateName() {
    //Checking if the name is not empty
    if (name === ''){
      setFieldError(fieldError => ({...fieldError, nameError: "Name Field cannot be empty!"}));
      return false;
    }
    //If does not follow the right pattern
    else if (!name.match(/^[0-9a-zA-Z]+$/)) {
      setFieldError(fieldError => ({...fieldError, nameError: "Only Letters"}));
      return false;
   }
    //Set item is right
    else {
      setFieldError(fieldError => ({...fieldError, nameError: ""}));
      return true;
    }
  }

  function validateRoomKey(scrollName) {
    //Checking if the name is not empty
    if (room === ''){
      setFieldError(fieldError => ({...fieldError, roomError: "secret word cannot be empty!"}));
      return false;
    }
    //If does not follow the right pattern
    else if (!room.match(/^[a-zA-Z]+$/)) {
      setFieldError(fieldError => ({...fieldError, roomError: "only Letters in the secret word"}));
      return false;
   }
    //Set item is right
    else {
      setFieldError(fieldError => ({...fieldError, roomError: ""}));
      return true;
    }

  }

  function handleNewRoomSubmit (event) {
    event.preventDefault();
    let nameBool = validateName();
    if (nameBool === true) {
      history.push({
        pathname: '/setup', 
        state: { name, color }
      }); 
    }
    else {
      scrollTo("name");
    }
  }

  function handleJoinRoomSubmit(event){
    event.preventDefault();
    let nameBool = validateName();
    if (nameBool === true) {
      let roomBool = validateRoomKey();
      if (roomBool === true) {
        history.push({
          pathname: '/lobby', 
          state: { name, color, room }
        }); 
      }
      else {
        scrollTo("secretword");
      } 
    }
    else {
      scrollTo("name");
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
        <h1>Welcome to</h1>
        <h1 id="title">Campfire</h1>
          <div className="welcomebg">
          </div>
          <h3>press tab or scroll down to continue.</h3>
        </section>

        <section id="name">
          <h1 className="heading">what is your name?</h1>
          <div>
            <p color="red">{fieldError.nameError}</p>
            <input placeholder="Name" tabIndex = "0" className="joinInput" type="text" onChange={(event) => {
              setName(event.target.value)}} onKeyPress={(e) => {handleUserInput(e, 'colpick')}} />
            <button className={'button'} type="submit" tabIndex = "1" onClick={handleNameButton}>continue</button>
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
          {/* <Link to={ {pathname: '/setup', state: { name, color }}}> */}
          <button className={'button'} type="submit" tabIndex = "4" onClick={handleNewRoomSubmit}>start a campfire</button>
          {/* </Link> */}
          <button className={'button'} type="submit" onClick={revealScroll} tabIndex="5">join a campfire</button>
        </div>
        </section>

        <section id="secretword" className="reveal-if-active">
          <h1 className="heading">what is the secret word</h1>
          <div>
          <p color="red">{fieldError.roomError}</p>
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
          
            <button className={'button mt-20'} type="submit" onClick = {handleJoinRoomSubmit}> Continue </button>
    
        </section>
      </div>
  );
}

