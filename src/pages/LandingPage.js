import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Projects from './Projects';
import AppAppBar from './AppAppBar'

export default function LandingPage() {
  const [mode, setMode] = React.useState('light');
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />     
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} /> 

    </ThemeProvider>
  );
}