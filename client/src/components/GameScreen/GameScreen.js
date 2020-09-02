import React from 'react';

import './GameScreen.css';

class GameScreen extends React.Component {
    constructor() {
       super();
    }
 
   myCondition1() {
     return (
         <div>
             HI!
         </div>
     );
  }
 
 
   myCondition2() {
     return (
        <div>
        NotHi
        </div>
     );
  }
 
   render() {
      const {condition} = this.props;
      return (
          <div>
              {condition == 'true' ? this.myCondition1() : this.myCondition2()}

          </div>
          //{condition == 'True' ? this.myCondition1() : this.myCondition2()}
      )
   }
 }

export default GameScreen;