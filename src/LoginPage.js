import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase'; // Import the auth object from firebase.js
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; //to navigate after login
import { collection, query, where, getDocs } from 'firebase/firestore';




// Creates a React component for the login page
function LoginPage() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); //Add this near your useState lines

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(''); 

  try {
    // find user email by userId in Firestore
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setMessage('User ID not found.');
      return;
    }

    const userDoc = querySnapshot.docs[0];
    const email = userDoc.data().email;

    // use emmail from firestore to sign in
    await signInWithEmailAndPassword(auth, email, password);

    setMessage('');
    navigate('/home');  // Redirect to your home page after login
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
        <div className="login-container" style={{ textAlign: 'center', marginTop: '100px', height: '100vh', backgroundColor: '#b9b48d' 
            }}
        >
            {/* BUD */} 
            <h1 style={{ fontSize: '4rem', marginBottom: '20px', color: '#3c2c2c', fontFamily: 'Impact, sans-serif' }}>BUD</h1>

            <h2>Login</h2>

        
            <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left' }}>
                <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="user ID">User ID:</label><br />
                        <input
                            type="text"
                            if="userId"
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

            {/* red error message */}
            {message && <p style={{ marginTop: '20px', color: 'red' }}>{message}</p>}

            <p style={{ marginTop: '20px' }}>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
           
        </div>
    );
}

export default LoginPage;
