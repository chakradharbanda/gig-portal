import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust path as necessary
import {
  Button,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ onAdminClick, onUserClick }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate("/admin");
    onAdminClick(); // Navigate to the admin route
  };

  const handleUserClick = (user) => {
    navigate("/projects");
    onUserClick(user); // Navigate to the user-specific route
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);
        const usersList = querySnapshot.docs.map((doc) => doc.data());
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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
        Welcome to the Landing Page
        </Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={handleAdminClick}>
        Admin
      </Button>
      <Typography variant="h5" gutterBottom>
        Select a User:
      </Typography>
      <List>
        {users.length ? (
          users.map((user) => (
            <ListItem
              key={user.userId}
              button
              onClick={() => handleUserClick(user)}
              sx={{ mb: 2, border: "1px solid #ddd", borderRadius: 1, p: 2 }}
            >
              <ListItemText
                primary={user.name}
                secondary={
                  <>
                    <Typography variant="body2">Role: {user.role}</Typography>
                    <Typography variant="body2">Email: {user.email}</Typography>
                    <Typography variant="body2">
                      Skills: {user.skills.join(", ")}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography>No users available.</Typography>
        )}
      </List>
    </Container>
  );
};

export default LandingPage;
