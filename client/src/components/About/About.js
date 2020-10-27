import React from 'react';
import { Link } from "react-router-dom"; 
import './About.css';

const About = () => {
  console.log("On the page!")
return(
    <div>
    <section id="about">
      <div className="outerContainer">
        <h1>About Campfire</h1>
        <p>Ever played that sentence constructor game, where each person in a group adds a single word to form the sentences of a collective story? Campfire is a digitalized version of that sort of storytelling experience. 
        </p>
        <p> Players can create a gathering space for a new story by starting their own campfire. The host of the campfire must decide what sort of theme will guide their story that night, as well as certain constraints to challenge their fellow storytellers. Such constraints include a lower and upper word limit for each turn, a time limit for each turn, and a goal for the overall length of the story that is told by all players together. A secret word will then be given to the host of the campfire, and it must be shared with the host's friends in order for them to find their way to the gathering space. Other players may navigate to the campfire by indicating they would like to join a campfire on our home page, after which they may enter the host's secret word. After all storytellers have arrived, the host can begin the story.  </p>
        <p>
        All members of the campfire will then take turns adding on to an ever growing story, making contributions according to the constraints specified earlier by the host. The experience can be fast paced, in which each member is given mere seconds to think of a word, or slow paced, in which each member may mull over a sentence or two before submitting. The kind of story that manifests from this campfire gathering depends entirely on the host's design. 
        </p>
      </div>
      <div>
      <Link to={`/`}><h3>← Awesome! Take me back to the homepage.</h3></Link>
      </div>
      </section>
      </div>
)
}

export default About;