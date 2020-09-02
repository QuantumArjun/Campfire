import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import { Link } from "react-router-dom";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Lobby.css';

let socket;

const Lobby = ({ location }) => {
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);


  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [usedRooms, setUsedRooms] = useState([]);
  const [mode, setMode] = useState('');
  const [topic, setTopic] = useState('');
  const [lowerwordlimit, setLowerWordLimit] = useState('');
  const [higherwordlimit, setHigherWordLimit] = useState('');
  const [storylength, setStoryLength] = useState('');
  const [timelimit, setTimeLimit] = useState('');
  const [roomPrefs, setRoomPrefs] = useState('');
  //const ENDPOINT = 'https://campfire-storytellers.herokuapp.com/';
  const ENDPOINT = 'http://localhost:5000/';



  useEffect(() => {
    const { name, room, mode, topic, lowerwordlimit, higherwordlimit, storylength, timelimit } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    var host = true;

    if (typeof timelimit === 'undefined') {
      host = false;
    } 
    
    if(host) 
    {
      setRoom(room);
      console.log("Client1 Room is:", room);
      setName(name);
      console.log(name);
      setTopic(topic);
      //console.log(topic);
      setStoryLength(storylength);
      //console.log(storylength);
      setLowerWordLimit(lowerwordlimit);
      //console.log(lowerwordlimit);
      setHigherWordLimit(higherwordlimit);
      //console.log(higherwordlimit);
      setTimeLimit(timelimit);
      //console.log(timelimit);
      setMode(mode);
      //console.log(mode);

      var isHost = true;
  
      socket.emit('join', { name, room, mode, topic, lowerwordlimit, higherwordlimit, storylength, timelimit, isHost}, (error) => {
        if(error) {
          alert(error);
        }
      });
    }
    else 
    {
      setRoom(room);
      console.log("Client Room is:", room);
      setName(name);
      console.log(name);

      var isHost = false;

      socket.emit('join', { name, room, mode, topic, lowerwordlimit, higherwordlimit, storylength, timelimit, isHost}, (error) => {
        if(error) {
          alert(error);
        }
      });
    }

  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users, roomPrefs }) => {
      setUsers(users);
      setRoomPrefs(roomPrefs);
      console.log("Users", users);
      console.log("RoomData", roomPrefs);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  function revealChat()
  {
    document.getElementById("chat").classList.remove("reveal-if-active");
    document.getElementById("chatbox").classList.remove("reveal-if-active");
    document.getElementById("invite").classList.add("reveal-if-active");
    document.getElementById("inviteContainer").classList.add("reveal-if-active");
  }

  return (
    <div>
    <section id="invite">
      <div className="outerContainer" id="inviteContainer">
      <h1> Set Up Your Campfire</h1>
      <h2> Invite Your Friends</h2>
      <h3> Secret Word: {room}</h3>
      <h2>Members of Your Campfire</h2> 
      <TextContainer users={users}/>
      <a href="#chat">
        <button className={'button mt-20'} type="submit" onClick={revealChat}>Begin Your Story</button>
      </a>
      </div>
    </section>
    <section id="chat" className="reveal-if-active">
    <div id="chatbox" className="chatContainer"  className="reveal-if-active">
      <div className="rmContainer">
          <InfoBar room={room} />
           <Messages messages={messages} name={name} />
          <div id="userBox"> <h2> Storytellers </h2><TextContainer users={users}/></div>
      </div>
      <div id="inputBox"><Input message={message} setMessage={setMessage} sendMessage={sendMessage} /></div>
    </div>
    </section>
    </div>
  );
}

export default Lobby;
