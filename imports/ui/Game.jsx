import React from 'react';
import { Meteor } from 'meteor/meteor';


function updateGrid(gameId, symbol) {
    return function(idx) {
        Meteor.call('games.update', gameId, idx, symbol)
    }
}

const Cell = ({idx, val, onClick, disabled}) => {
    return (
        <div
          className='cell has-background-white'
          onClick={() => onClick(idx)} disabled={disabled}>
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
    let gameEnded = state === 'ended';
    console.log("game: ", game);
    
    return (
        <div className='container has-text-centered'>
            <div className='fixed-grid has-3-cols'>
                <div className='grid'>
                    { cells.map((val, idx) =>
                        <Cell 
                          key={idx} 
                          idx={idx} 
                          val={val}
                          onClick={onClick}
                          disabled={gameEnded}/>) }
                </div>
            </div>
            <div>
                Game Id: {_id}
            </div>
            <div>
                Game state: {state}
            </div>
            {state === 'ended'? 
                <div>
                    Winner: {game.winner}, {game.sinnerSymbol}
                </div>
                :
                <div>
                    Your turn?: {yourTurn? 'true' : 'false'}
                </div>
            }
        </div>
    );
}