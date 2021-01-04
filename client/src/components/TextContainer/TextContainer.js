import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      
    </div>
    {
      users
        ? (
          <div>
            <div className="activeContainer">
              <h2>
                {users.map(({name, color}) => (
                  <div key={name} className="activeItem">
                    <font color={color}>{name}</font>
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);


export default TextContainer;