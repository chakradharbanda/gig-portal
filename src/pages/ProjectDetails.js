// src/pages/ProjectDetails.js
import React, { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import ApplyForProject from './ApplyForProject';
import { useParams } from 'react-router-dom';

function ProjectDetails() {
  const { projectId } = useParams(); // Get projectId from URL parameters
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) {
        setError('Project ID is missing.');
        return;
      }

      try {
        const projectRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(projectRef);

        if (docSnap.exists()) {
          setProject(docSnap.data());
        } else {
          setError('No such document!');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Error fetching project.');
      }
    };

    fetchProject();
  }, [projectId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {project ? (
        <>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <p>Domain: {project.domain}</p>
          <p>Client: {project.client}</p>
          <p>Duration: {project.duration}</p>
          <p>Status: {project.status}</p>
          <p>Skills Required: {project.skillsRequired.join(', ')}</p>
          <ApplyForProject projectId={projectId} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProjectDetails;
