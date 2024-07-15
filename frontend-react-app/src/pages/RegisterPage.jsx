import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { Box, TextField, Typography } from "@mui/material";
import OAuth from "../components/OAuth/OAuth";
import { AuthButton } from "../components/CustomButton/AuthButton";

export const RegisterPage = () => {

    const navigate = useNavigate()
    const registerUser = async (ev) => {

        ev.preventDefault();
        const email = ev.target.elements.email.value
        const username = ev.target.elements.username.value
        const password = ev.target.elements.password.value
       

        axios.post('/auth/register', {
            name: username,
            password,
            email
        }).then(() => {
            alert('Registration successful')
            navigate ('/login')
        }).catch((e) => {
            alert(e.message)
        }
        )

    }
    return (
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: '5rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '450px' }}>
                <Typography variant="h1" textAlign={'center'} >Register Now!</Typography>
                <form id='registerform' onSubmit={registerUser}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <TextField required
                            id="username"
                            label="Name"
                            type="text"
                            variant="outlined"
                        />
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
                        <AuthButton type='submit' form='registerform' > Register </AuthButton>
                        <OAuth/>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', paddingTop: '1rem' }}>
                            <Typography>Already have an account?</Typography>
                            <Link to={'/login'}>
                                <Typography sx={{ textDecoration: 'underline' }}>Login</Typography>
                            </Link>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}