// src/pages/ApplyForProject.js
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function ApplyForProject({ projectId }) {
  const [application, setApplication] = useState({
    userId: 'unique-user-id-3'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication({ ...application, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const applicationsRef = collection(db, 'applications');
      await addDoc(applicationsRef, {
        projectId,
        ...application,
        status: 'pending', // or 'submitted' based on your requirements
        createdAt: new Date(),
      });
      alert('Application submitted successfully');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application');
    }
  };

  return (
    <div>
      <h2>Apply for Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          {application.userId}
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default ApplyForProject;

