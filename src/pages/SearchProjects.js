// src/pages/SearchProjects.js
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

function SearchProjects() {
  const [projects, setProjects] = useState([]);

  const handleSearch = async () => {
    const q = query(
      collection(db, 'projects'),
      where('skillsRequired', 'array-contains-any', ['react']) // Example filter
    );

    const querySnapshot = await getDocs(q);
    const projectList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProjects(projectList);
  };

  return (
    <div>
      <h2>Search Projects</h2>
      <button onClick={handleSearch}>Search</button>
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchProjects;
