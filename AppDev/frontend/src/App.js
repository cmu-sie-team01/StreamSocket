import logo from './logo.svg';
import './App.css';
import BottomBar from './BottomBar'
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CountrySelect from "./CountrySelect";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import BasicTabs from "./tabs";

function App() {
  const theme = createTheme();

  return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                  marginBottom:2
              }}
          >
              <BasicTabs/>
              <BottomBar/>

          </Box>
        </Container>
      </ThemeProvider>
  );
}

export default App;
