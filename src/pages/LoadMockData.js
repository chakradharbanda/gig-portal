// src/pages/LoadMockData.js
import React from 'react';
import { addMockProjects } from '../services/projectServices';

function LoadMockData() {
  const handleLoadData = async () => {
    try {
      await addMockProjects();
      alert('Mock projects added successfully');
    } catch (error) {
      alert('Error adding mock projects');
    }
  };

  return (
    <div>
      <h2>Load Mock Data</h2>
      <button onClick={handleLoadData}>Load Mock Projects</button>
    </div>
  );
}

export default LoadMockData;
