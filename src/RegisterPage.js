import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase'; // Import the auth object from firebase.js
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(''); // This state is not used in this component, but can be useful for future referenc
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); //navigate after registration

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the page from reloading on form submission

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user; //get the user object from the credential
            console.log("Registered user:", user);

            //save user data to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                userId: userId,
                email: user.email,
                createdAt: new Date()
            });
            
            console.log("User registered and saved to Firestore");
            setMessage('Registered successfully!');
            navigate('/login');
        } catch (error) {
            console.error("Error:", error.message);
            setMessage(`${error.message}`);
        }
    };

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
                <div style={{ marginBottom: '10px' }}>
                    <label>User ID:</label><br />
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p style={{ marginTop: '20px' }}>{message}</p>}
            <p style={{ marginTop: '20px' }}>
                Already have an account? <Link to="/">Login here</Link>
            </p>
        </div>
    );
}

export default RegisterPage;
