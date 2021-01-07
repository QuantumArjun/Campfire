import React, { useState, useEffect } from "react";
// import queryString from 'query-string';
import { useHistory } from "react-router-dom";
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
//import { Lobby } from "../Lobby/Lobby.js";

import './Setup.css';
/*
Todo
- Pass in game parameters and create a server side lobby
- Join that server side lobby using a secret word 
*/

const Setup = ({ location }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [room, setRoom] = useState('');
  const [usedRooms, setUsedRooms] = useState([]);
  const [mode, setMode] = useState('');
  const [topic, setTopic] = useState('');
  const [lowerwordlimit, setLowerWordLimit] = useState('20');
  const [higherwordlimit, setHigherWordLimit] = useState('100');
  const [storylength, setStoryLength] = useState(3);
  const [timelimit, setTimeLimit] = useState(60);
  const [fieldError, setFieldError] = useState({});
  // const [testValue, setTestValue] = useState({value: { min: 20, max: 100 }})

  const ENDPOINT = 'https://campfire-storytellers.herokuapp.com/';
  let history = useHistory();
  
  var adj_arr = ['aggressive', 'alert', 'alive', 'ancient', 'anxious', 'arrow', 'attractive', 'average', 'bad', 'beautiful', 'beige', 'better', 'big', 'bitter', 'black', 'blue', 'brown', 'bumpy', 'busy', 'careful', 'cheap', 'chestnut', 'clear', 'cold', 'combative', 'cool', 'cotton', 'crazy', 'crooked', 'crystal', 'dangerous', 'dead', 'delicious', 'dim', 'drab', 'dry', 'dull', 'dusty', 'elderly', 'excited', 'expensive', 'fancy', 'fat', 'few', 'filthy', 'fresh', 'fuzzy', 'giant', 'good', 'graceful', 'granite', 'green', 'handsome', 'happy', 'hard', 'harsh', 'hollow', 'hot', 'huge', 'hungry', 'large', 'lazy', 'light', 'long', 'low', 'massive', 'mellow', 'melodic', 'miniscule', 'modern', 'new', 'noisy', 'oak', 'octagonal', 'old', 'orange', 'oval', 'petite', 'pink', 'plain', 'plastic', 'poor', 'puny', 'purple', 'quiet', 'rainy', 'red', 'rich', 'right', 'round', 'sad', 'safe', 'salty', 'sane', 'scared', 'shallow', 'sharp', 'shiny', 'short', 'shrill', 'shy', 'skinny', 'small', 'soft', 'solid', 'sore', 'sour', 'square', 'steep', 'sticky', 'strong', 'superior', 'sweet', 'swift', 'tan', 'tart', 'teak', 'teeny', 'terrible', 'tiny', 'tired', 'tremendous', 'triangular', 'ugly', 'unusual', 'weak', 'weary', 'wet', 'whispering', 'white', 'wild', 'wooden', 'woolen', 'wrong', 'yellow', 'young']
  var noun_arr = ['Adventure', 'Animals', 'backpack', 'boots', 'cabin', 'camp', 'camper', 'campfire', 'campground', 'canoe', 'canteen', 'cap', 'caravan', 'climb', 'compass', 'equipment', 'evergreen', 'fishing', 'flashlight', 'forest', 'hammock', 'hat', 'hike', 'hiking', 'boots', 'hunting', 'hut', 'kayak', 'knapsack', 'lake', 'lantern', 'map', 'moon', 'natural', 'nature', 'oar', 'outdoors', 'outside', 'paddle', 'park', 'path', 'tent', 'rope', 'scenery', 'sleepingBag', 'stars', 'statePark', 'sun', 'sunscreen', 'tarp', 'tent', 'trail', 'trailMix', 'trailer', 'trees', 'trip', 'vest', 'walking', 'waterBottle', 'waterfall', 'wildlife', 'woods', 'Backpack', 'Binoculars', 'Boots', 'Marshmallow', 'Radio', 'SleepingBag', 'Tent', 'Torch', 'WaterBottle', 'Canopy', 'Forest', 'Mushroom', 'Terrain', 'Wildlife', 'Birdwatching', 'Hike', 'Stargazing', 'Scouting']

  
  var roomList = ["a", "b", "c"];

  const genRoom = () => {
    var bool1 = true;
    var count = 0;
    while(bool1 && count < 10) {
      var adj_word = adj_arr[Math.floor(Math.random() * adj_arr.length)];
      adj_word = adj_word.charAt(0).toUpperCase() + adj_word.slice(1);

      var noun_word = noun_arr[Math.floor(Math.random() * noun_arr.length)];
      noun_word = noun_word.charAt(0).toUpperCase() + noun_word.slice(1);

      var chosenRoom = adj_word.concat(noun_word);

      console.log(!usedRooms.includes(chosenRoom))
      console.log("Chosen:" + chosenRoom)
      console.log("Used" + usedRooms)
      
      if (!usedRooms.includes(chosenRoom)) {
        // console.log("I made it!")
        setUsedRooms([...usedRooms, chosenRoom]);
        setRoom(chosenRoom);
        bool1 = false;
      }
      count++;
    }
  }

  useEffect(() => {
    const {name, color} =  location.state;

    genRoom(roomList);
    setColor(color);
    setName(name);

  }, [ENDPOINT, location.search]);

  function handleSetupSubmit (event) {
    event.preventDefault();
    let boolForms = validateFields();
    if (boolForms == true) {
      //pass to next level
      history.push(
      {
        pathname: '/lobby',
        state: {name, color, room, mode, topic, lowerwordlimit, higherwordlimit, storylength,timelimit, isHost: true}
      });
    }
  }

  function validateFields () {
    let internal_bool = true;

    if (topic === ''){
      setFieldError(fieldError => ({...fieldError, topicError: "Topic cannot be empty! Its fun to have one :)"}));
      internal_bool = false;
    }
    else {
      setFieldError(fieldError => ({...fieldError, topicError: ""}));
    }

    //Check if charachters are only numbers
    if (lowerwordlimit !== "" && !(/^\d+$/.test(lowerwordlimit))) {
      setFieldError(fieldError => ({...fieldError, lwlError: "min words must be a positive number!"}));
      internal_bool = false;
    }
    else if (lowerwordlimit !== "" && (/^\d+$/.test(lowerwordlimit))){
      //Check if number is the right range
      if(parseInt(lowerwordlimit) < 0 || parseInt(lowerwordlimit) > 9999) {
        setFieldError(fieldError => ({...fieldError, lwlError: "min words is out of range! Pick a number 0-9999"}));
        internal_bool = false;
      }
      else if (higherwordlimit !== "" && (/^\d+$/.test(higherwordlimit)) && !(parseInt(higherwordlimit) < 0 || parseInt(higherwordlimit) > 9999)) {
        // Checking Min Max relation
        if(parseInt(higherwordlimit) <= parseInt(lowerwordlimit)){
          setFieldError(fieldError => ({...fieldError, lwlError: "min words must be smaller than max words!", hwlError: "max words must be larger than min words!"}));
          internal_bool = false;
        }
        else {
          setFieldError(fieldError => ({...fieldError, lwlError: "", hwlError: ""}));
        }
      }
    }
    
    //Check if charachters are only numbers
    if (higherwordlimit !== "" && !(/^\d+$/.test(higherwordlimit))){
      setFieldError(fieldError => ({...fieldError, hwlError: "max words must be a number!"}));
      internal_bool = false;
    }
    else if (higherwordlimit !== "" && (/^\d+$/.test(higherwordlimit))){
      //Check if number is the right range
      if(parseInt(higherwordlimit) < 0 || parseInt(higherwordlimit) > 9999) {
        setFieldError(fieldError => ({...fieldError, hwlError: "max words is out of range! Pick a number 0-9999"}));
        internal_bool = false;
      }
    }
    return internal_bool;
  }
  


  return (
      <div class="Container">
        <section id = "general">
          <h1> set your preferences </h1> <br></br>
            <label for="topic">Topic:</label>
            <p color="red">{fieldError.topicError}</p>
            <input type="text" id="topic" name="topic" onChange={(event) => {
              setTopic(event.target.value)}}></input>
            <div className="setup-grid">
              <div>
              <label for="storylength">Number of Rounds:</label>
              <select name="storylength" id="storylength"value={storylength} onChange={(event) => {setStoryLength(event.target.value)}}>
                <option name="2">2</option>
                <option name="3">3</option>
                <option name="4">4</option>
                <option name="5">5</option>
                <option name="6">6</option>
                <option name="7">7</option>
                <option name="8">8</option>
                <option name="9">9</option>
                <option name="10">10</option>
              </select>
              </div>

              <div>
                <label for="timelimit">Time Limit (sec):</label>
                <select id="timelimit" name="timelimit" value={timelimit} onChange={(event) => {setTimeLimit(event.target.value)}}>
                  <option name="30">30</option>
                  <option name="40">40</option>
                  <option name="50">50</option>
                  <option name="60">60</option>
                  <option name="70">70</option>
                  <option name="80">80</option>
                  <option name="90">90</option>
                  <option name="100">100</option>
                  <option name="110">110</option>
                  <option name="120">120</option>
                  <option name="130">130</option>
                  <option name="100">140</option>
                  <option name="110">150</option>
                  <option name="120">160</option>
                  <option name="130">170</option>
                  <option name="130">180</option>
                  <option name="none">Why Have a Time Limit :)</option>
                </select>
              </div>

              <div>
                <label for="lowerwordlimit">Min Word Limit:</label>
                <p color="red">{fieldError.lwlError}</p>
                <input type="text" id="lowerwordlimit" name="lowerwordlimit" onChange={(event) => {
                  setLowerWordLimit(event.target.value)}}></input>
              </div>
              <div>
                <label for="higherwordlimit">Max Word Limit:</label>
                <p color="red">{fieldError.hwlError}</p>
                <input type="text" id="higherwordlimit" name="higherwordlimit" onChange={(event) => {
                  setHigherWordLimit(event.target.value)}}></input>
              </div>

              
              {/* DISCUSS ON JUST USING A SLIDER */}
              {/* <div>
                <label for="higherwordlimit">Max Word Limit:</label>
                <InputRange
                  maxValue={300}
                  minValue={0}
                  value = {testValue.value}
                  onChange={(value) => {setTestValue({ value }); setHigherWordLimit(toString(testValue.value.max));}} />
              </div> */}

              </div>
          <div>
            <button className={'setup-button mt-20'} type="submit" onClick = {handleSetupSubmit}>Continue</button>
          </div>
        </section>
      </div>
  );
}

export default Setup;

