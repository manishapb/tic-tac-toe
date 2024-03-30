import { Meteor } from 'meteor/meteor';
import { GameCollection } from '../db/Collections';

Meteor.methods({
    'games.new'() {
        let userId = Meteor.userId();
        const grid = Array(3).fill(Array(3));
        GameCollection.insert({ 
            player1: userId,
            player2: null,
            currentPlayer: userId,
            grid: grid,
            state: 'waiting'
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
    }
});
