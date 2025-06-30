import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase'; // Import the auth object from firebase.js
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { useNavigate, Link } from 'react-router-dom';
import { query, collection, where, getDocs } from 'firebase/firestore';


function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [course, setCourse] = useState(''); // This state is not used in this component, but can be useful for future reference
    const [userId, setUserId] = useState(''); // This state is not used in this component, but can be useful for future referenc
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); //navigate after registration

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Check if userId is taken
        const q = query(collection(db, 'users'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            setMessage('This user ID is already taken.');
            return; // Stop registration
        }

        // Register with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save to Firestore
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            userId: userId,
            email: user.email,
            course: course,
            createdAt: new Date()
        });

        setMessage('Registered successfully!');
        navigate('/login');

    } catch (error) {
        console.error("Error:", error.message);

        if (error.code === 'auth/email-already-in-use') {
            setMessage('This email is already registered.');
        } else {
            setMessage(`Registration failed: ${error.message}`);

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
                <div style={{ marginBottom: '10px' }}>
                    <label>Course:</label><br />
                    <select value={course} onChange={(e) => setCourse(e.target.value)} required>
                        <option value="">-- Select Course --</option>
                        <option value="">-- Select a course --</option>
    <option>Business Administration</option>
    <option>Business Analytics</option>
    <option>Computer Science</option>
    <option>Computer Engineering</option>
    <option>Information Security</option>
    <option>Business Artificial Intelligence Systems (BAIS)</option>
    <option>Dentistry</option>
    <option>Architecture</option>
    <option>Engineering</option>
    <option>Industrial Design</option>
    <option>Landscape Architecture</option>
    <option>Data Science and Economics</option>
    <option>Environmental Studies</option>
    <option>Food Science and Technology</option>
    <option>Humanities and Sciences</option>
    <option>Philosophy Politics and Economics (PPE)</option>
    <option>Law</option>
    <option>Medicine</option>
    <option>Music</option>
    <option>Nursing</option>
    <option>Pharmacy</option>
    <option>Pharmaceutical Science</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>

            {message && <p style={{ marginTop: '20px', color: 'red' }}>{message}</p>}

            <p style={{ marginTop: '20px' }}>
                Already have an account? <Link to="/">Login here</Link>
            </p>
        </div>
    );
}

export default RegisterPage;
