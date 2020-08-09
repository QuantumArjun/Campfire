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
  const [lowerwordlimit, setLowerWordlimit] = useState('');
  const [higherwordlimit, setHigherWordlimit] = useState('');
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
            <input type="text" id="topic" name="topic"></input>
            <label for="lowerwordlimit">Lower Word Limit:</label>
            <input type="text" id="lowerwordlimit" name="lowerwordlimit"></input>
            <label for="higherwordlimit">Higher Word Limit:</label>
            <input type="text" id="higherwordlimit" name="higherwordlimit"></input>
            <label for="storylength">Story Length:</label>
            <input type="text" id="storylength" name="storylength"></input>
            <label for="timelimit">Time Limit:</label>
            <input type="text" id="timelimit" name="timelimit"></input>
            
        </section>
        <Link to={`/lobby?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Continue</button>
        </Link>
      </div>
  );
}

export default Setup;

