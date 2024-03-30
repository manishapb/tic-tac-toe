import { Meteor } from 'meteor/meteor';
import { GameCollection, makeGameForUser } from '../db/Collections';

function keyToXY(key) {
    return [
        Math.floor(key / 3),
        key % 3
    ];
}

Meteor.methods({
    'games.new'(userId) {
        return makeGameForUser(userId);
    },

    'games.update'(gameId, key, symbol) {
        let grid = GameCollection.findOne({_id: gameId}).grid;
        let [x, y] = keyToXY(key);
        grid[x][y] = symbol;

        GameCollection.update(
            { _id: gameId },
            { $set: { grid: grid }}
        );
    }
});
