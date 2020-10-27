import React, { useState, useEffect } from "react";
//import queryString from 'query-string';
import io from "socket.io-client";
//import { Link } from "react-router-dom";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
//import GameScreen from '../GameScreen/GameScreen';

import './Lobby.css';

let socket;

var myName = "";

const Lobby = ({ location }) => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isHost, setisHost] = useState('');
  const [name, setName] = useState('');
  const [activePlayer, setActivePlayer] = useState('');
  const [wordcount, setWordCount] = useState('');

  const [roomPrefs, setRoomPrefs] = useState('');
  const [gameStart, setGameStart] = useState(false);
  //const ENDPOINT = 'https://campfire-storytellers.herokuapp.com/';
  const ENDPOINT = 'http://localhost:5000/';



  useEffect(() => {
    const {name, room, isHost} =  location.state;
    socket = io(ENDPOINT);

    let fixedName = name.trim().toLowerCase();
    setName(fixedName);
    myName = fixedName;
    
    if(isHost) 
    { 
      setisHost("true")
      setActivePlayer(true)
      const {mode, topic, lowerwordlimit, higherwordlimit, storylength, timelimit, wordcount } = location.state;
  
      socket.emit('create', { name, room, mode, topic, lowerwordlimit, higherwordlimit, storylength, timelimit, wordcount}, (error) => {
        if(error) {
          alert(error);
        }
      });
    }
    else 
    {
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
  }
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on('roomData', users => {
      //setUsers(users);
      console.log(users.users)
      setUsers(users.users);
    });

    socket.on("startSignal", roomPrefs => {
      setRoomPrefs(roomPrefs)
      setGameStart(true)

      revealChat();

    });

    socket.on("newGlobalWC", newWC =>{
      console.log(newWC);
      setWordCount(newWC.newWC);
    });

}, []);

useEffect(() => {

  socket.on("advanceTurn", ({currPlayer}) => {
    console.log("Users", currPlayer.currPlayer.name)
    console.log(name)
    if (currPlayer.currPlayer.name == myName){
      setActivePlayer(true)
    } else {
      setActivePlayer(false)
    }

    console.log("Room Prefs", roomPrefs)
  });

}, [roomPrefs, name]);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  
  return (
    <div>
      {console.log("RoomPrefs", roomPrefs.roomPrefs)}
      {console.log("GameStart", gameStart)}
    <section id="invite">
      <div className="outerContainer" id="inviteContainer">
      <h1> Set Up Your Campfire</h1>
      <h2> Invite Your Friends</h2>
      <h3> Secret Word: {location.state.room} </h3>
      <h2>Members of Your Campfire</h2> 
      <TextContainer users={users}/>
     { isHost === "true" && <div id = "begin-btn">
        <a href="#chat">
          <button className={'button mt-20'} type="submit" onClick={onStartClick}>Begin Your Story</button>
        </a>
      </div> }
  
    </div>
    </section>
    <section id="chat" className="reveal-if-active">
    <div id="chatbox" className="chatContainer"  className="reveal-if-active">
      <div className="rmContainer">
          <InfoBar room={location.state.room} />
           <Messages messages={messages} name={location.state.name} />
           { gameStart == true && <div id="userBox"> 
                            <h2> Storytellers </h2><TextContainer users={users}/>
                            <h2> Story Word Count: {wordcount} </h2>
                            <h2> Story Word Count Goal: {roomPrefs.roomPrefs.storylength} </h2>
                            <h2> Min Words Per Turn: {roomPrefs.roomPrefs.lowerwordlimit} </h2>
                            <h2> Max Words Per Turn: {roomPrefs.roomPrefs.higherwordlimit} </h2>
          </div> }
        </div> 
      { gameStart == true && activePlayer == true && <div id="inputBox">
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} roomPrefs = {roomPrefs} />
        </div>  
        
        }
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