import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase'; // Adjust based on your firebase config
import { collection, query, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';


function AddBuddy() {
    const [buddyId, setBuddyId] = useState('');
    const [message, setMessage] = useState('');
    const [userCourse, setUserCourse] = useState(''); // This state is not used in this component, but can be useful for future reference

    // get current user id and course
    useEffect(() => {
        async function fetchUserCourse() {
            if (!auth.currentUser) {
                setMessage('You must be logged in to add a buddy.');
                return;
            }

            const userEmail = auth.currentUser.email;
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', userEmail));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                setUserCourse(userData.course || ''); // Set user course if available
            } else {
                setMessage('User not found.');
            }
        }
        fetchUserCourse();
    }, []);
    const handleAddBuddy = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            // check if buddy's user id exists
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('userId', '==', buddyId));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                setMessage('No user found with that user ID.');
                return;
            }

            const buddyData = querySnapshot.docs[0].data();

            // check if buddy is in the same course
            if (buddyData.course !== userCourse) {
                setMessage('Buddy must be in the same course.');
                return;
            }

            //add buddy to current user's buddies array
            const currentUserEmail = auth.currentUser.email;
            const userQuery = query(usersRef, where('email', '==', currentUserEmail));
            const userSnapshot = await getDocs(userQuery);
            if (userSnapshot.empty) {
                setMessage('Current user not found.');
                return;
            }

            const currentUserDocId = currentUserSnapshot.docs[0].id;
            const currentUserDocRef = doc(db, 'users', currentUserDocId);
            await updateDoc(currentUserDocRef, {
                buddies: arrayUnion(buddyData.uid) // Assuming buddyData.uid is the UID of the buddy
            });
            setMessage('Buddy added successfully!');
            setBuddyId('');
        } catch (error) {
            console.error('Error adding buddy:', error);
            setMessage(`Failed to add your buddy: ${error.message}`);
        }
    };

    return (
  <div>
    <form onSubmit={handleAddBuddy}>
      <label>Enter Buddy's ID:</label>
      <input value={buddyId} onChange={(e) => setBuddyId(e.target.value)} />
      <br /><br />
      <button type="submit">Add Your Buddy</button>
    </form>
    {message && (
      <p
        style={{
          marginTop: '20px',
          color: message.includes('successfully') ? 'green' : 'red',
        }}
      >
        {message}
      </p>
    )}
  </div>
);

         
}

export default AddBuddy;