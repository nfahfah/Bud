import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';

function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMessage('User ID not found.');
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const email = userDoc.data().email;

      await signInWithEmailAndPassword(auth, email, password);

      setMessage('');
      navigate('/home');
    } catch (error) {
      console.error("Login error:", error.message);

      if (error.code === 'auth/wrong-password') {
        setMessage('Incorrect password.');
      } else if (error.code === 'auth/user-not-found') {
        setMessage('User not found.');
      } else {
        setMessage('Failed to log in. Please try again.');
      }
    }
  };

  return (
    <div style={{
      textAlign: 'center',
      marginTop: '0',
      minHeight: '100vh',
      backgroundColor: '#b9b48d',
      color: '#3c4215',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontFamily: 'Impact, sans-serif', fontSize: '3rem' }}>BUD</h1>
      <h2>Login</h2>

      <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="userId">User ID:</label><br />
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password">Password:</label><br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {message && <p style={{ marginTop: '20px', color: 'red' }}>{message}</p>}

      <p style={{ marginTop: '20px' }}>
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default LoginPage;


