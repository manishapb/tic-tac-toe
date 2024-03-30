import { Meteor } from 'meteor/meteor';
import { GameCollection } from '/imports/db/Collections'
import '/imports/api/gameMethods';
import '/imports/api/userMethods';

Meteor.publish("game", function () {
  return GameCollection.find({ 
    $or: [
      { player1: this.userId, state: {$ne: 'ended'}},
      { player2: this.userId, state: {$ne: 'ended'}}
  ]});
});

// Meteor.startup(async () => {});