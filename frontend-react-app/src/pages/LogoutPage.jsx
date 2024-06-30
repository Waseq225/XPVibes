import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios'
import { UserContext } from '../userContext';

export const LogoutPage = () => {

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            axios.post('/logout')
                .then(() => {
                    setUser(null)
                    alert('Logout success')
                }).catch((e) =>
                    alert('Logout failed' + e)
                )
        }
    }, [setUser, user])

    return (
        <Navigate to={'/'} />
    )
}
