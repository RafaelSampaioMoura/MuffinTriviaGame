import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from '../Pages/Game';
import Login from '../Pages/Login';
import Settings from '../Pages/Settings';
import Feedback from '../Pages/Feedback';
import Ranking from '../Pages/Ranking';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default Routes;
