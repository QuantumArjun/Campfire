import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import queryString from 'query-string';
import io from "socket.io-client";
import { Link } from "react-router-dom";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import GameScreen from '../GameScreen/GameScreen';

import './Lobby.css';

let socket;

const Lobby = ({ location }) => {
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [roomPrefs, setRoomPrefs] = useState([]);
  const [gameStart, setGameStart] = useState('');
  //const ENDPOINT = 'https://campfire-storytellers.herokuapp.com/';
  console.log({location})
  const ENDPOINT = 'http://localhost:5000/';



  useEffect(() => {
    const {name, room, isHost} =  location.state;
    socket = io(ENDPOINT);
    
    if(isHost) 
    {
      const {mode, topic, lowerwordlimit, higherwordlimit, storylength, timelimit } = location.state;
      document.getElementById("begin-btn").classList.add("reveal-if-active");   
      console.log("Client1 Room is:", room);
      console.log(name);
  
      socket.emit('create', { name, room, mode, topic, lowerwordlimit, higherwordlimit, storylength, timelimit}, (error) => {
        if(error) {
          alert(error);
        }
      });
    }
    else 
    {
      console.log("Client Room is:", room);
      console.log(name);

      socket.emit('join', { name, room}, (error) => {
        if(error) {
          alert(error);
        }
      });
    }

  }, [ENDPOINT, location.search]);

  function revealChat()
  {
    document.getElementById("chat").classList.remove("reveal-if-active");
    document.getElementById("chatbox").classList.remove("reveal-if-active");
    document.getElementById("invite").classList.add("reveal-if-active");
    document.getElementById("inviteContainer").classList.add("reveal-if-active");
  }

  const onStartClick = (event) => {
    event.preventDefault();
    socket.emit('start');
    console.log("Start!")
  }
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users, roomPrefs }) => {
      setUsers(users);
      setRoomPrefs(roomPrefs);
      console.log("Users", users);
      // console.log("RoomData", roomPrefs);
    });

    socket.on("startSignal", ({}) => {
      //setGameStart("true");
      revealChat();
      console.log("Synced")
    });

}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  
  return (
    <div>
    <section id="invite">
      <div className="outerContainer" id="inviteContainer">
      <h1> Set Up Your Campfire</h1>
      <h2> Invite Your Friends</h2>
      <h3> Secret Word: {location.state.room} </h3>
      <h2>Members of Your Campfire</h2> 
      <TextContainer users={users}/>
      <div id = "begin-btn">
        <a href="#chat">
          <button className={'button mt-20'} type="submit" onClick={onStartClick}>Begin Your Story</button>
        </a>
      </div>
  
    </div>
    </section>
    <section id="chat" className="reveal-if-active">
    <div id="chatbox" className="chatContainer"  className="reveal-if-active">
      <div className="rmContainer">
          <InfoBar room={location.state.room} />
           <Messages messages={messages} name={location.state.name} />
          <div id="userBox"> <h2> Storytellers </h2><TextContainer users={users}/></div>
      </div>
      <div id="inputBox"><Input message={message} setMessage={setMessage} sendMessage={sendMessage} higherwordlimit={location.state.higherwordlimit} lowerwordlimit = {location.state.lowerwordlimit} /></div>
    </div>
    </section>
    </div>
  );
}

export default Lobby;
/*<div className="container">
<InfoBar room={room} condition = {gameStart}/>
<Messages messages={messages} name={name} condition = {gameStart}/>
<Input message={message} setMessage={setMessage} sendMessage={sendMessage} condition = {gameStart}/>
</div> */