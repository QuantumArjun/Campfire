import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import { Link } from "react-router-dom";


import './Setup.css';
/*
Todo
- Pass in game parameters and create a server side lobby
- Join that server side lobby using a secret word 
*/

const Setup = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [usedRooms, setUsedRooms] = useState([]);
  const [mode, setMode] = useState('');
  const [topic, setTopic] = useState('');
  const [lowerwordlimit, setLowerWordLimit] = useState('');
  const [higherwordlimit, setHigherWordLimit] = useState('');
  const [storylength, setStoryLength] = useState('');
  const [timelimit, setTimeLimit] = useState('');
  const ENDPOINT = 'https://campfire-storytellers.herokuapp.com/';
  var roomList = ["a", "b", "c"];

  const genRoom = () => {
    var bool1 = true;
    var count = 0;
    while(bool1 && count < 10) {
      var chosenRoom = roomList[Math.floor(Math.random() * roomList.length)];

      console.log(!usedRooms.includes(chosenRoom))
      console.log("Chosen:" + chosenRoom)
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

  useEffect(() => {
    const { name } = queryString.parse(location.search);

    genRoom(roomList);
    setName(name);
    console.log(name);
    console.log(room);

  }, [ENDPOINT, location.search]);
  


  return (
      <div>
        <section id = "general">
            <label for="topic">Topic:</label>
            <input type="text" id="topic" name="topic" onChange={(event) => {
              setTopic(event.target.value)}}></input>
            <label for="lowerwordlimit">Lower Word Limit:</label>
            <input type="text" id="lowerwordlimit" name="lowerwordlimit" onChange={(event) => {
              setLowerWordLimit(event.target.value)}}></input>
            <label for="higherwordlimit">Higher Word Limit:</label>
            <input type="text" id="higherwordlimit" name="higherwordlimit" onChange={(event) => {
              setHigherWordLimit(event.target.value)}}></input>
            <label for="storylength">Story Length:</label>
            <input type="text" id="storylength" name="storylength" onChange={(event) => {
              setStoryLength(event.target.value)}}></input>
            <label for="timelimit">Time Limit:</label>
            <input type="text" id="timelimit" name="timelimit" onChange={(event) => {
              setTimeLimit(event.target.value)}}></input>
            
        </section>
        <Link to={`/lobby?name=${name}&room=${room}&mode=${mode}&topic=${topic}&lowerwordlimit=${lowerwordlimit}&higherwordlimit=${higherwordlimit}&storylength=${storylength}&timelimit=${timelimit}`}>
          <button className={'button mt-20'} type="submit">Continue</button>
        </Link>
      </div>
  );
}

export default Setup;

