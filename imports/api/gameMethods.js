import { Meteor } from 'meteor/meteor';
import { makeGameForUser } from '../db/Collections';

Meteor.methods({
    'games.new'(userId) {
        return makeGameForUser(userId);
    }
})
