import React from 'react';
import { Meteor } from 'meteor/meteor';

const Cell = ({gameId, idx, val, symbol}) => {
    return (
        <div
          className='cell has-background-white'
          onClick={() => Meteor.call('games.update', gameId, idx, symbol)}>
            { val || '_' }
        </div>
    );
}

export const Game = ({ game }) => {
    let { _id, grid, player1 } = game;
    let uid = Meteor.userId();
    let symbol = uid === player1? 'X' : 'O';
    let cells = grid.flat();
    
    return (
        <div className='container has-text-centered'>
            <div className='fixed-grid has-3-cols'>
                <div className='grid'>
                    { cells.map((val, idx) =>
                        <Cell 
                            key={idx} 
                            idx={idx} 
                            gameId={_id} 
                            val={val} 
                            symbol={symbol}/>) }
                </div>
            </div>        
        </div>
    );
}