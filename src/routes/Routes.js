import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Settings from '../Pages/Settings';
import Trivia from '../Pages/Trivia';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact="/settings" component={ Settings } />
        <Route exact path="/trivia" component={ Trivia } />
      </Switch>
    );
  }
}

export default Routes;
