import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import Login from './Pages/Login';

export default function App() {
  return (
    <Switch>
      <Provider store={ store }>
        <Route exact path="/" component={ Login } />
      </Provider>
    </Switch>
  );
}
