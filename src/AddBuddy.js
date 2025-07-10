import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase'; // Adjust based on your firebase config
import { collection, query, where, getDoc, getDocs, updateDoc, arrayUnion, doc } from 'firebase/firestore';



function AddBuddy() {
  const [buddyId, setBuddyId] = useState('');
  const [message, setMessage] = useState('');
  const [userCourse, setUserCourse] = useState('');

  // Get current user ID and course on load
  useEffect(() => {
    async function fetchUserCourse() {
      if (!auth.currentUser) {
        setMessage('No logged in user.');
        return;
      }

      const userEmail = auth.currentUser.email;
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUserCourse(userData.course);
      } else {
        setMessage('User data not found.');
      }
    }
    fetchUserCourse();
  }, []);

  const handleAddBuddy = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // Check if buddyId exists
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('userId', '==', buddyId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMessage('Buddy user ID not found.');
        return;
      }

      const buddyData = querySnapshot.docs[0].data();

      // Check if buddy is in the same course
      if (buddyData.course !== userCourse) {
        setMessage('Buddy is not in the same course.');
        return;
      }

      // Add buddy to current user's buddy list
      const currentUserEmail = auth.currentUser.email;
      const currentUserQuery = query(usersRef, where('email', '==', currentUserEmail));
      const currentUserSnapshot = await getDocs(currentUserQuery);

      if (currentUserSnapshot.empty) {
        setMessage('Current user data not found.');
        return;
      }

      const currentUserDocId = currentUserSnapshot.docs[0].id;
      const currentUserDocRef = doc(db, 'users', currentUserDocId);

      await updateDoc(currentUserDocRef, {
        buddies: arrayUnion(buddyId)
      });

      setMessage('Buddy added successfully!');
      setBuddyId(''); // clear input
    } catch (error) {
      console.error('Error adding buddy:', error);
      setMessage('Failed to add buddy. Please try again.');
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

