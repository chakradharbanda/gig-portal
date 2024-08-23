// src/services/userService.js
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Function to add a new user to Firestore
export const addUser = async (userData) => {
  try {
    // Add a new document with a generated ID
    const docRef = await addDoc(collection(db, 'users'), userData);
    console.log('User added with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding user: ', e);
    throw e;
  }
};
