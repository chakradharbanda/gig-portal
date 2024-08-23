import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import PersonIcon from "@mui/icons-material/Person";
import StyleIcon from "@mui/icons-material/Style";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Link } from "react-router-dom";

const logoStyle = {
  width: "50px",
  height: "auto",
  cursor: "pointer",
};

function AppAppBar({ mode, toggleColorMode, isAdmin }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/hyper.png`}
                style={logoStyle}
                alt="logo of sitemark"
              />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {!isAdmin ? (
                <><MenuItem
                    component={Link}
                    to="/projects"
                    onClick={() => scrollToSection("hero")}
                    sx={{ py: 1, px: 2 }}
                  >
                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.primary">
                      Projects
                    </Typography>
                  </MenuItem><MenuItem
                    component={Link}
                    to="/my-applications" // Link to the desired path
                    onClick={() => scrollToSection("logoCollection")}
                    sx={{ py: 1, px: 2 }}
                  >
                      <StyleIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.primary">
                        My Applications
                      </Typography>
                    </MenuItem></>):(
                <MenuItem
                  component={Link}
                  to="/admin" // Link to the desired path
                  onClick={() => scrollToSection("logoCollection")}
                  sx={{ py: 1, px: 2 }}
                >
                  <StyleIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.primary">
                    Approve Applications
                  </Typography>
                </MenuItem>)}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

              {isAdmin ? (
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component="a"
                  target="_blank"
                >
                  Admin
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component="a"
                  target="_blank"
                >
                  User
                </Button>
              )}
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                    {isAdmin ? (
                      <Button
                        color="primary"
                        variant="text"
                        size="small"
                        component="a"
                        href="/material-ui/getting-started/templates/sign-in/"
                        target="_blank"
                      >
                        Admin
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        component="a"
                        href="/material-ui/getting-started/templates/sign-up/"
                        target="_blank"
                      >
                        User
                      </Button>
                    )}
                  </Box>
                  <MenuItem onClick={() => scrollToSection("hero")}>
                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                    Projects
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("logoCollection")}>
                    <StyleIcon color="primary" sx={{ mr: 1 }} />
                    My Applications
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
