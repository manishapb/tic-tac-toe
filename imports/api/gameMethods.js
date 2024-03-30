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

    'games.update'(gameId, key, symbol) {
        let grid = GameCollection.findOne({_id: gameId}).grid;
        let [x, y] = [
            Math.floor(key / 3),
            key % 3
        ];
        grid[x][y] = symbol;

        GameCollection.update(
            { _id: gameId },
            { $set: { grid: grid }}
        );
    }
});
