import { ThemeProvider } from '@emotion/react';
import {
    Box,
    Button,
    createTheme,
    Paper
} from '@mui/material';

const theme = createTheme({
    palette: {
      primary: {
        main: "#fbfcf8",
        contrastText: "#ffffff" //button text white instead of black
      }
    }
  });

export const Categories = () => {

    return (
        <Paper
            elevation={0}

            sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: '#4c3c3c',
                borderRadius: '0',
                padding: '10px 0'
            }}>
<ThemeProvider theme ={theme}>
            <Box>
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
            </Box>
            </ThemeProvider>
        </Paper>
    );
}