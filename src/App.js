import './App.css';
import Login from './components/Login/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Destination from './components/Destination/Destination';
import React, { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NotFound from './components/NotFound/NotFound';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isSignedin: false,
    newuser: false,
    username: '',
    name: '',
    email: '',
    photoURL: '',
    password: '',
    confirmPassword: '',
    error: ''
  });
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/destination/:vehicletype">
              <Destination />
            </PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
