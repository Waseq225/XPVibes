import { Button } from '@mui/material'
import axios from 'axios'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SnackbarContext } from '../../snackbarContext'
import { UserContext } from '../../userContext'
import { getAuth, deleteUser } from 'firebase/auth'

export const DeleteAccount = () => {
    const { user, setUser } = useContext(UserContext)
    const { setToastOpen, setToastText } = useContext(SnackbarContext)

    const navigate = useNavigate()

    const auth = getAuth()
    const firebaseUser = auth.currentUser

    const handleDeleteUser = async (ev) => {
        ev.preventDefault()

        deleteUser(firebaseUser)
            .then(() => axios.delete(`/user/delete/${user._id}`))
            .then(() => {
                setUser(null)
                setToastText('User deleted')
                setToastOpen(true)
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return <Button onClick={handleDeleteUser}>Cancel account</Button>
}
