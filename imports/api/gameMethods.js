import { Meteor } from 'meteor/meteor';
import { GameCollection } from '../db/Collections';

function gameOver(grid) {
    for (let i=0; i<3; i++) {
        if ((grid[i][0] && (grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2])) ||
            (grid[0][i] && (grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i])))
            return true;
    }
    if ((grid[0][0] && (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2])) ||
        (grid[2][0] && (grid[2][0] === grid[1][1] && grid[1][1] === grid[0][2])))
        return true;
    return false;
}

Meteor.methods({
    'games.new'() {
        let userId = Meteor.userId();
        const grid = Array(3).fill(Array(3));
        GameCollection.insert({ 
            player1: userId,
            player2: null,
            currentPlayer: userId,
            grid: grid,
            state: 'waiting',
            winner: null,
            winnerSymbol: null
        });

        let game = GameCollection.findOne({
            player1: userId,
            state: {$eq: 'waiting'}
        });
        return game;
    },

    'games.join'(gameId) {
        let game = GameCollection.findOne({_id: gameId});
        let player2 = Meteor.userId();

        GameCollection.update(
            { _id: gameId },
            { $set: { player2,
                      state: 'active' }}
        );
    },

    'games.update'(gameId, key, symbol) {
        let game = GameCollection.findOne({_id: gameId});
        let grid = game.grid;
        let [x, y] = [
            Math.floor(key / 3),
            key % 3
        ];
        grid[x][y] = symbol;

        let nextPlayer = game.currentPlayer === game.player1?
                game.player2 : game.player1;

        GameCollection.update(
            { _id: gameId },
            { $set: { grid: grid,
                      currentPlayer: nextPlayer }}
        );
    
        if (gameOver(grid)) {
            GameCollection.update(
                { _id: gameId },
                { $set: { state: 'ended',
                          winner: grid.currentPlayer,
                          winnerSymbol: symbol  }}
            );
        }
    }
});
