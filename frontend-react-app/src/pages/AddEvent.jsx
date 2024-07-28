import { Box, CircularProgress } from '@mui/material'
import { useContext } from 'react'

import { Navigate } from 'react-router-dom'
import { AddEventForm } from '../components/AddEventForm/AddEventForm'
import { UserContext } from '../userContext'

export const AddEvent = () => {
    const { hasOrganizerPermission, userLoading } = useContext(UserContext)


    if (userLoading) {
        return <CircularProgress />
    } else if (!hasOrganizerPermission) {
        return <Navigate to='/' />
    } else {
        return (
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '5rem',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        width: '450px',
                    }}
                >
                    <AddEventForm />
                </Box>
            </Box>
        )
    }
}
