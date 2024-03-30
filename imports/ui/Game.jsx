import React from 'react';
import { Meteor } from 'meteor/meteor';

function updateGrid(gameId, symbol) {
    return function(idx) {
        Meteor.call('games.update', gameId, idx, symbol)
    }
}

const Cell = ({idx, val, onClick}) => {
    return (
        <div
          className='cell has-background-white'
          onClick={() => onClick(idx)}>
            { val || '_' }
        </div>
    );
}

export const Game = ({ game }) => {
    let { _id, grid, player1, currentPlayer, state } = game;
    let uid = Meteor.userId();
    let symbol = uid === player1? 'X' : 'O';
    let yourTurn = (state === 'active' && currentPlayer === uid); 
    let onClick = yourTurn? updateGrid(_id, symbol) : () => null;
    let cells = grid.flat();
    
    return (
        <div className='container has-text-centered'>
            <div className='fixed-grid has-3-cols'>
                <div className='grid'>
                    { cells.map((val, idx) =>
                        <Cell 
                          key={idx} 
                          idx={idx} 
                          val={val}
                          onClick={onClick}/>) }
                </div>
            </div>
            <div>
                Game Id: {_id}
            </div>
            <div>
                Game state: {state}
            </div>
            <div>
                Your turn?: {yourTurn? 'true' : 'false'}
            </div>
        </div>
    );
}