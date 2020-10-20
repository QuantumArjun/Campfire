import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import { Link } from "react-router-dom";
import { Lobby } from "../Lobby/Lobby.js";

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
      <div class="Container">
        <section id = "general">
          <h1> set your preferences </h1> <br></br>
            <label for="topic">Topic:</label>
            <input type="text" id="topic" name="topic" onChange={(event) => {
              setTopic(event.target.value)}}></input>
            <div className="setup-grid">
              <div>
                <label for="lowerwordlimit">Lower Word Limit:</label>
                <input type="text" id="lowerwordlimit" name="lowerwordlimit" onChange={(event) => {
                  setLowerWordLimit(event.target.value)}}></input>
              </div>
              <div>
                <label for="higherwordlimit">Higher Word Limit:</label>
                <input type="text" id="higherwordlimit" name="higherwordlimit" onChange={(event) => {
                  setHigherWordLimit(event.target.value)}}></input>
              </div>
              <div>
                <label for="storylength">Story Length:</label>
                <input type="text" id="storylength" name="storylength" onChange={(event) => {
                  setStoryLength(event.target.value)}}></input>
              </div>
              <div>
                <label for="timelimit">Time Limit:</label>
                <input type="text" id="timelimit" name="timelimit" onChange={(event) => {
                  setTimeLimit(event.target.value)}}></input>
              </div>
              </div>
        <Link to={ {pathname: '/lobby',
          state: {name, room, mode, topic, lowerwordlimit, higherwordlimit, storylength,timelimit}}}>
          <button className={'setup-button mt-20'} type="submit">Continue</button>
        </Link>

        
        </section>
      </div>
  );
}

export default Setup;

