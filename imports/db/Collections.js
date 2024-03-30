import { Mongo } from 'meteor/mongo';

export const GameCollection = new Mongo.Collection('games');
globalThis.Games = GameCollection;

export function makeGameForUser(userId) {
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
}