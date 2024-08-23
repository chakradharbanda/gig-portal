import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the path to your firebaseConfig file

export const addMockUsers = async () => {
  const users = [
    {
      email: "john.doe@example.com",
      name: "John Doe",
      role: "user",
      skills: ["react", "java", "typescript"],
      userId: "unique-user-id-1"
    },
    {
      email: "jane.smith@example.com",
      name: "Jane Smith",
      role: "admin",
      skills: ["angular", "node.js", "typescript"],
      userId: "unique-user-id-2"
    },
    {
      email: "michael.brown@example.com",
      name: "Michael Brown",
      role: "user",
      skills: ["vue", "python", "django"],
      userId: "unique-user-id-3"
    },
    {
      email: "lisa.jones@example.com",
      name: "Lisa Jones",
      role: "user",
      skills: ["react", "node.js", "express"],
      userId: "unique-user-id-4"
    }
    // Add more users as needed
  ];

  try {
    const promises = users.map(user => 
      setDoc(doc(db, 'users'), user)
    );

    await Promise.all(promises);
    console.log('All user data added successfully');
  } catch (error) {
    console.error('Error adding user data:', error);
  }
};
