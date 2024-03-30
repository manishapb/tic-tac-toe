import React, { useEffect, useState } from 'react';
import { Home } from './Home';
import { Game } from './Game';
import { Loading } from './Loading';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { GameCollection } from '/imports/db/Collections';

function genstr() {
  return (Math.random() + 1).toString(36).substring(7);
}

export const App = () => {
  const [username, setUsername] = useState(genstr());

  useEffect(() => {
    Meteor.call('users.new', username, (err, _) => {
      if(err) {
        setUsername(genstr());
      } else {
        Meteor.loginWithPassword(username, username);
      }
    });
  }, [username]);

  const isGameLoading = useSubscribe('game');
  const games = useFind(() => GameCollection.find());
  const game = games[0];

  return (
    <section className="hero is-fullheight">
      <div className='hero-body'>
        { isGameLoading()? 
           <Loading /> 
           : (game? <Game game={game} /> : <Home />) }
      </div>
    </section>
  );
};
