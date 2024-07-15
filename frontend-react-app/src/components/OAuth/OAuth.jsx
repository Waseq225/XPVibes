import React, { useContext } from 'react'
import { Button } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../userContext';
import { AuthButton } from '../CustomButton/AuthButton';

export default function OAuth() {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext);

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)

        const result = await signInWithPopup(auth, provider)

        axios.post('/auth/google', {
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL
        }).then(({ data }) => {
            setUser(data)
            navigate('/')
        }).catch((e) => {
            alert(e.message)
        }
        )

    }

    return (
        <AuthButton onClick={handleGoogleClick}
            color='error'
        >
            Continue with Google
        </AuthButton>
    )
}
