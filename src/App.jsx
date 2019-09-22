import React, { Component } from 'react';
import  './stylesheets/app.css';
import Main from './components/Main';
import Login from './components/Login';
import Profile from './components/Profile';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Nomatch from './components/Nomatch';
import Logout from './components/Logout';
import './stylesheets/app.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={Main} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/profile/:id" exact component={Profile} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <PrivateRoute path="/logout" component={Logout} />
          <Route component={Nomatch} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
