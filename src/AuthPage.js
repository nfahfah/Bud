import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // Import the auth object from firebase.js
import React, { useState } from 'react';

//creates a react component for the authentication page
function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevents the page from reloading on form submission

        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log("Registered user:", userCredential.user);
          setMessage('Registered successfully!');  
        } catch (error) {
            console.error("Error:", error.message);
            setMessage(`${error.message}`);
        }
    };

    //what we want to show on the authentication page
    return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
}

export default AuthPage;


