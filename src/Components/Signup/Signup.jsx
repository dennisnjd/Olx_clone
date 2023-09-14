import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';

import { auth, db } from '../../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseContext } from '../../store/FirebaseContext';
import { doc, setDoc } from 'firebase/firestore';

import { Link, useNavigate  } from 'react-router-dom';

export default function Signup() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const { auth } = useContext(FirebaseContext)


  const handleSubmit = (e) => {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        updateProfile(auth.currentUser, {
          displayName: username
        })
        let objId = username+userCredential.user.uid;
        const userRef = doc(db, "users", objId);
        setDoc(userRef, {
          id: userCredential.user.uid,
          username: username,
          phone: number
        }).then(() => {
          navigate("/login")
        });
      })
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" alt='Logo' height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login'>
          <a>Login</a>
        </Link>
      </div>
    </div>
  );
}
