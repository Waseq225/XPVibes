import { Link } from "react-router-dom";
// import Header from "../components/Header";
import {
    Box,
    Button,
    TextField,
    Typography
} from '@mui/material';

export const LoginPage = () => {
    return (
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: '5rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '450px' }}>
                <Typography variant="h1" textAlign={'center'} >Vibe in!</Typography>
                <form id='loginform' onSubmit={(ev) => { ev.preventDefault(); console.log(ev) }}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                        />
                        <Button type='submit' form='loginform' variant="contained"> Login </Button>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', paddingTop: '1rem' }}>
                            <Typography>Don`t have an account yet? </Typography>
                            <Link to={'/register'}>
                                <Typography sx={{ textDecoration: 'underline' }}>Register now</Typography>
                            </Link>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}