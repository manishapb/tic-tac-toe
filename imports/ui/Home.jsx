import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

function newGame() {
    Meteor.call('games.new', err => {
      if(err)
        alert(err.message);
    });
}

function joinGame() {
  let gameId = prompt('Enter game id: ');
  Meteor.call('games.join', gameId);
}
  
export const Home = () => {
  return (
    <div className='container has-text-centered'>
      <p className='title'>Tic Tac Toe</p>
      <div className='button' onClick={newGame}>New Game</div>
      <br></br>
      <div className='button' onClick={joinGame}>Join Game</div>
    </div>
  );
}