import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the path to your firebaseConfig
import {
  Typography,
  Card,
  Container,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Icon,
} from "@mui/material";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import UserProfile from "./UserProfile";
import ProjectDetailsDialog from "./ProjectDetailsDialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UserDetailsDialog from "./UserDetailsDialog";

const AdminProjectApproval = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const q = query(
        collection(db, "applications"),
        where("status", "==", "pending") // Fetch only pending applications
      );

      const querySnapshot = await getDocs(q);
      console.log(
        "Fetched Applications:",
        querySnapshot.docs.map((doc) => doc.data())
      ); // Debugging log

      const projectMap = {};

      for (const applicationDoc of querySnapshot.docs) {
        const application = applicationDoc.data();
        const projectDocRef = doc(db, "projects", application.projectId);
        const projectSnapshot = await getDoc(projectDocRef);
        const project = projectSnapshot.data();

        // Fetch the user document based on the userId field
        const userQuery = query(
          collection(db, "users"),
          where("userId", "==", application.userId)
        );
        const userQuerySnapshot = await getDocs(userQuery);

        let user = null;
        if (!userQuerySnapshot.empty) {
          // Assuming userId is unique, we take the first document
          user = userQuerySnapshot.docs[0].data();
        }

        if (!user) {
          console.log(`No user found for userId: ${application.userId}`);
          continue;
        }

        if (!project) {
          console.log(
            `No project found for projectId: ${application.projectId}`
          );
          continue;
        }

        // Ensure the project is in the map
        if (!projectMap[application.projectId]) {
          projectMap[application.projectId] = {
            project: project,
            applications: [],
          };
        }

        // Add the application and its corresponding user to the project map
        projectMap[application.projectId].applications.push({
          id: applicationDoc.id,
          ...application,
          user: user, // Include the user object in the application
        });
      }

      console.log("Project Map:", Object.values(projectMap)); // Debugging log

      setProjects(Object.values(projectMap));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApproval = async (projectId, applicationId) => {
    try {
      // Approve the selected application
      const applicationDocRef = doc(db, "applications", applicationId);
      await updateDoc(applicationDocRef, { status: "approved" });
      // Reject all other applications for the same project
      const q = query(
        collection(db, "applications"),
        where("projectId", "==", projectId),
        where("status", "==", "pending")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.forEach(async (doc) => {
        await updateDoc(doc.ref, { status: "rejected" });
      });
      // Refresh the UI by fetching the updated list of applications and projects
      await fetchApplications();
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const [selectedProject, setSelectedProject] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedProject(null);
  };

  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpenUser, setDialogOpenUser] = useState(false);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setDialogOpenUser(true);
  };

  const handleCloseUser = () => {
    setDialogOpenUser(false);
    setSelectedUser(null);
  };

  if (loading) return <p>Loading applications...</p>;

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Approve Applications for Projects
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        {projects.length === 0 ? (
          <Typography variant="body1">No pending applications.</Typography>
        ) : (
          projects.map((project) => (
            <Card key={project.project.projectId} sx={{ marginBottom: 4 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {project.project.title}
                  <IconButton
                    color="primary"
                    onClick={() => handleCardClick(project.project)}
                    aria-label="view"
                    sx={{ ml: 2 }} // Adjusts margin to create space between title and icon
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Typography>

                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>User</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Skills</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Action</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {project.applications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>
                            {application.userId}{" "}
                            <IconButton
                              color="primary"
                              onClick={() =>
                                handleUserClick(application.user)
                              }
                              aria-label="view"
                              sx={{ ml: 2 }} // Adjusts margin to create space between title and icon
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            {application.user.skills.join(", ")}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<CheckCircleOutlineIcon />}
                              onClick={() =>
                                handleApproval(
                                  project.project.projectId,
                                  application.id
                                )
                              }
                            >
                              Approve
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
      {/* Project Details Dialog */}
      {selectedProject && (
        <ProjectDetailsDialog
          open={dialogOpen}
          handleClose={handleDialogClose}
          project={selectedProject}
          projectId={selectedProject.id}
          readOnly={true}
        />
      )}
      {selectedUser && (
        <UserDetailsDialog
          open={dialogOpenUser}
          handleClose={handleCloseUser}
          user={selectedUser}
        />
      )}
    </Container>
  );
};

export default AdminProjectApproval;
