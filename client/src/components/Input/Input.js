import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message, gameStart, roomPrefs}) => (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
      />
      {gameStart && <button className="sendButton" onClick={e => sendMessage(e)}>{roomPrefs.roomPrefs.lowerwordlimit}</button>}
    </form>
)

export default Input;