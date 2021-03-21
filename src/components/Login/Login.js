import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { Input } from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";

export default function Login() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [newUser, setnewUser] = useState(false);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const handleChange = (e) => {
    let validForm = true;
    if (e.target.name === "email") {
      validForm = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      validForm = e.target.value.length >= 8;
    }
    if (validForm) {
      const newuser = { ...loggedInUser };
      newuser[e.target.name] = e.target.value;
      setLoggedInUser(newuser);
    }
    if (!validForm) {

    }
  }

  const emailSignIn = (e) => {
    if (!newUser && loggedInUser.email && loggedInUser.password) {
      firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const newuser = { ...loggedInUser };
          newuser.error = '';
          newuser.isSignedin = true;
          newuser.username = user.displayName;
          userNameUpdate(newuser.username)
          setLoggedInUser(newuser);
          history.replace(from);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const newuser = { ...loggedInUser };
          newuser.error = errorMessage;
          setLoggedInUser(newuser);
        });
    }
    if (newUser && loggedInUser.email && (loggedInUser.password === loggedInUser.confirmPassword)) {
      firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const newuser = { ...loggedInUser };
          newuser.error = '';
          newuser.isSignedin = true;
          setLoggedInUser(newuser);
          // ...
          userNameUpdate(loggedInUser.username);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const newuser = { ...loggedInUser };
          newuser.error = errorMessage;
          setLoggedInUser(newuser);
          // ..
        });
    }
    if ((loggedInUser.password !== loggedInUser.confirmPassword) && loggedInUser.confirmPassword !== '') {
      const newuser = { ...loggedInUser };
      newuser.error = "Password did not matched";
      setLoggedInUser(newuser);
    }
    e.preventDefault();
  }
  const userNameUpdate = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const { displayName, email, photoURL } = user;
        const newuser = {
          isSignedin: true,
          username: displayName,
          name: '',
          email: email,
          photoURL: photoURL,
          password: ''
        }
        setLoggedInUser(newuser);
        history.replace(from);
      }).catch((error) => {

      });
  }


  return (
    <div>
      <form onSubmit={emailSignIn}>
        {
          newUser && <Form.Group controlId="formBasicUserName">
            <Form.Label>Username</Form.Label><br></br>
            <Input onBlur={handleChange} type="text" name="username" placeholder="Enter your username" required />
          </Form.Group>
        }
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address : </Form.Label><br></br>
          <Input onBlur={handleChange} name="email" placeholder="Enter your email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
      </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password :</Form.Label>
          <Input onBlur={handleChange} type="password" name="password" placeholder="Enter your password" required />
          <Form.Text className="text-muted">
            your password must be 8 digit or more
      </Form.Text>
        </Form.Group>
        {
          newUser && <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password :</Form.Label>
            <Input onBlur={handleChange} type="password" name="confirmPassword" placeholder="Confirm password" required />
          </Form.Group>
        }
        <p style={{ color: 'tomato' }}><b>{loggedInUser.error}</b></p>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="New user?" onChange={() => { setnewUser(!newUser); loggedInUser.error = '' }} />
        </Form.Group>
        <input type="submit" className="m-2" /><br></br>
      </form>
      <Button variant="danger" onClick={googleSignIn}>Sign in google</Button>
    </div>
  );
}