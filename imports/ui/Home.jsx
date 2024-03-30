import React from 'react';
import { Meteor } from 'meteor/meteor';

function newGame() {
    Meteor.call('games.new', err => {
      if(err)
        alert(err.message);
    });
}
  
export const Home = () => {
    return (
      <div className='container has-text-centered'>
        <p className='title'>Tic Tac Toe</p>
        <div className='button' onClick={newGame}>New Game</div>
        <br></br>
        <div className='button'>Join Game</div>
      </div>
    );
}