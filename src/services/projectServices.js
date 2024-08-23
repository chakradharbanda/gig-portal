// src/services/projectService.js
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Function to add mock projects to Firestore
export const addMockProjects = async () => {
  const projects = [
    {
      projectId: 'project-1',
      title: 'Web Application Development',
      description: 'Develop a web application using React and Firestore',
      skillsRequired: ['React', 'Firestore'],
      domain: 'IT',
      client: 'Client A',
      duration: '6 months',
      status: 'open',
    },
    {
      projectId: 'project-2',
      title: 'Mobile App Development',
      description: 'Create a mobile app for iOS and Android using Flutter',
      skillsRequired: ['Flutter', 'Dart'],
      domain: 'Mobile',
      client: 'Client B',
      duration: '8 months',
      status: 'open',
    },
    {
      projectId: 'project-3',
      title: 'Data Analysis Platform',
      description: 'Build a data analysis platform using Python and Pandas',
      skillsRequired: ['Python', 'Pandas', 'Data Analysis'],
      domain: 'Data Science',
      client: 'Client C',
      duration: '12 months',
      status: 'closed',
    },
    {
      projectId: 'project-4',
      title: 'E-commerce Website',
      description: 'Develop an e-commerce platform with payment gateway integration',
      skillsRequired: ['Node.js', 'Express', 'MongoDB'],
      domain: 'E-commerce',
      client: 'Client D',
      duration: '4 months',
      status: 'open',
    },
    {
      projectId: 'project-5',
      title: 'Cloud Infrastructure Setup',
      description: 'Set up and configure cloud infrastructure on AWS',
      skillsRequired: ['AWS', 'CloudFormation', 'DevOps'],
      domain: 'Cloud',
      client: 'Client E',
      duration: '3 months',
      status: 'open',
    },
  ];

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
    for (const project of users) {
      await addDoc(collection(db, 'users'), project);
      console.log(`Project ${project.title} added successfully`);
    }
  } catch (e) {
    console.error('Error adding projects: ', e);
  }
};


