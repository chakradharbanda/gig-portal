// src/pages/Projects.js
import React, { useState, useEffect } from "react";
import { getAllProjects, searchProjects } from "../services/projectService";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/system";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    skillsRequired: [],
    domain: "",
    client: "",
    duration: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await getAllProjects();
        setProjects(allProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleSearch = async () => {
    try {
      const filteredProjects = await searchProjects(searchFilters);
      setProjects(filteredProjects);
    } catch (error) {
      console.error("Error searching projects:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value.trim();
    const skills =
      value.length === 0 ? [] : value.split(",").map((skill) => skill.trim());
    setSearchFilters({ ...searchFilters, skillsRequired: skills });
  };

  return (
    <div>
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
          Projects
          </Typography>
          <Typography variant="body1" color="text.secondary">
            See what our customers love about our products. Discover how we
            excel in efficiency, durability, and satisfaction. Join us for
            quality, innovation, and reliable support.
          </Typography>
        </Box>
        

      <div>
        <h3>Search Projects</h3>
        <input
          type="text"
          name="skillsRequired"
          placeholder="Skills (comma separated)"
          onChange={handleSkillsChange}
        />
        <input
          type="text"
          name="domain"
          placeholder="Domain"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="client"
          placeholder="Client"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

        <Grid container spacing={2}>
          {projects.map((project, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{ display: "flex" }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                  p: 1,
                }}
              >
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    <p>Domain: {project.domain}</p>
                    <p>Client: {project.client}</p>
                    <p>Duration: {project.duration}</p>
                    <p>Status: {project.status}</p>
                    <p>Skills Required: {project.skillsRequired.join(", ")}</p>
                    <Link to={`/project/${project.id}`}>View Details</Link>
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    pr: 2,
                  }}
                >
                  <CardHeader
                    title={project.title}
                    subheader={project.description}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Projects;
