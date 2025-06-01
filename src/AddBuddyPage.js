import React, { useState } from 'react';
import { auth, db } from './firebase'; // Import the auth and db objects from firebase.js
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'; // Import Firestore functions
import { useNavigate } from 'react-router-dom'; // to navigate after adding a buddy
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import Firestore functions for querying

function AddBuddyPage() {
    const [buddyEmail, setBuddyEmail] = useState('');
    const [message, setMessage] = useState('');
    const [buddyUserId, setBuddyUserId] = useState(''); // This state is not used in this component, but can be useful for future reference
    const navigate = useNavigate(); // Add this near your useState lines

    const handleAddBuddy = async (e) => {
    e.preventDefault();

    try {
        const user = auth.currentUser;
        if (!user) {
            setMessage('You must be logged in to add a buddy.');
            return;
        }

        // Look up user by userId
        const q = query(collection(db, 'users'), where('userId', '==', buddyUserId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            setMessage('No user found with that user ID.');
            return;
        }

        const buddyDoc = querySnapshot.docs[0];
        const buddyUid = buddyDoc.data().uid;

        // Add buddy UID to current user's 'buddies' array
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
            buddies: arrayUnion(buddyUid)
        });

        setMessage('Buddy added successfully!');
        setBuddyUserId('');

        setTimeout(() => {
            navigate('/dashboard');
        }, 1000);
    } catch (error) {
        console.error('Error adding buddy:', error.message);
        setMessage(error.message);
    }
};

    return (
        <div style={{ textAligh: 'center', marginTop: '100px' }}>
            <h2>Add a Buddy</h2>
            <form onSubmit={handleAddBuddy} style={{ display: 'inline-block', textAlign: 'left' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Buddy's User ID:</label><br />
                    <input
                        type="text"
                        value={buddyUserId}
                        onChange={(e) => setBuddyUserId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Buddy</button>
            </form>
            {message && <p style={{ marginTop: '20px' }}>{message}</p>}
        </div>
    );
}
export default AddBuddyPage;

    