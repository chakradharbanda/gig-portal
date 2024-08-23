// src/services/projectService.js
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Function to get all projects
export const getAllProjects = async () => {
  try {
    const projectsRef = collection(db, 'projects');
    const querySnapshot = await getDocs(projectsRef);
    const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return projects;
  } catch (e) {
    console.error('Error fetching projects: ', e);
    throw e;
  }
};

// Function to search for projects based on fields
export const searchProjects = async (filters) => {
  try {
    const { skillsRequired, domain, client, duration } = filters;
    let projectsRef = collection(db, 'projects');

    const queries = [];
    // Only add the query if the array is not empty
    if (skillsRequired && skillsRequired.length > 0) {
      debugger;
      queries.push(where('skillsRequired', 'array-contains-any', skillsRequired));
    }
    if (domain) {
      queries.push(where('domain', '==', domain));
    }
    if (client) {
      queries.push(where('client', '==', client));
    }
    if (duration) {
      queries.push(where('duration', '==', duration));
    }

    // If no filters are applied, return all projects
    debugger;
    const q = queries.length > 0 ? query(projectsRef, ...queries) : projectsRef;
    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return projects;
  } catch (e) {
    console.error('Error searching projects: ', e);
    throw e;
  }
};
