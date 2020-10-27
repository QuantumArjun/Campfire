import React from 'react';

import './Input.css';

class Input extends React.Component {
  constructor(props) { //props contains everything that was  passed into this component from lobby
    //console.log(props.higherwordlimit, props.lowerwordlimit);
    super(props);
    this.state = {
      message: "",
      needWords: props.roomPrefs.roomPrefs.lowerwordlimit,
      maxWords:  props.roomPrefs.roomPrefs.higherwordlimit,
      wordCount: "",
      limWordsMax: "",
      limWordsMin: ""
    };
    this.updateWC = this.updateWC.bind(this);
  }

  updateWC(event) {
    const wordCount =
      event.target.value === "" ? 0 : event.target.value.split(" ").length;
    this.setState({
      message: event.target.value,
      wordCount: wordCount,
      limWordsMax:
        this.state.maxWords - wordCount < 0 
          ? this.state.message.length  //setting char limit to current n chars (stops typing)
          : null,
      limWordsMin:
        wordCount - this.state.needWords < 0 //if words still need to be typed
        ? this.state.message.length + 1
        : null
    });
    console.log(this.state.limWordsMin);
  }

  updateMsg(e)
  {
    this.updateWC(e);
    this.props.setMessage(e.target.value);
  }

  sendFinalMessage(e)
  {
    e.preventDefault();
    if(this.state.wordCount >= this.state.needWords)
    {
    this.props.sendMessage(e);
    this.state.message = "";
    this.state.wordCount = 0;
    }

  }

  render() {
    var minProgress = this.state.needWords - this.state.wordCount;
    let charUpdate;
    if (minProgress >= 0)
    {
      charUpdate = (<p>You still have to write {minProgress} words</p>);
    }
    else
    {
      var maxProgress = this.state.maxWords - this.state.wordCount;
      if (maxProgress >= 0)
      {
        charUpdate = ( <p> You can still write {maxProgress} words</p> );
      }
      else
      {
        charUpdate = (
          <p> You've exceeded the word limit for your  turn. </p>
        );
      }
  }
    return (
      <div>
        {charUpdate} 
        <form className="form">
          <input type="text"
            value={this.state.message}
            onChange={event => this.updateMsg(event)}
            maxLength={this.state.limWordsMax}
            placeholder="Type a message..."
            onKeyPress={event => event.key === 'Enter' ? this.sendFinalMessage(event) : null}
          />
          <button className="sendButton" onClick={event => this.sendFinalMessage(event)}>Send</button>
        </form>

      </div>
    );
  }
}


export default Input;