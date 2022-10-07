import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";

export default function App() {
  return (
    <Switch>
      <Provider store={store}>
        <Route exact path='/' component={ Login } />
      </Provider>
    </Switch>
  );
}
