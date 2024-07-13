import { Link, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography
} from '@mui/material';
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../userContext";

export const LoginPage = () => {
    const navigate = useNavigate()

    const { setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const handleLoginSubmit = async (ev) => {
        ev.preventDefault();
        const email = ev.target.elements.email.value
        const password = ev.target.elements.password.value
        setLoading(true)
        axios.post('/auth/login', { email, password }).then(({ data }) => {
            setUser(data)
            setLoading(false)
            navigate('/')
        }).catch((e) => {
            setLoading(false)
            alert('Login failed' + e)
        }

        )

    }

    return (
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: '5rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '450px' }}>
                <Typography variant="h1" textAlign={'center'} >Vibe in!</Typography>
                <form id='loginform' onSubmit={handleLoginSubmit}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <TextField required
                            id="email"
                            label="Email"
                            type="email"
                            variant="outlined"

                        />
                        <TextField required
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                        />

                        {loading ?
                            <Button disabled variant="contained"><CircularProgress /> </Button>
                            :
                            <Button type='submit' form='loginform' variant="contained"> Login </Button>
                        }
                        {/* <Button type='submit' form='loginform' variant="contained"> Login </Button> */}
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