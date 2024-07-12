import axios from 'axios'
import { Box, Typography } from '@mui/material'
import { useState, useEffect } from 'react'

export const EventGrid = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        axios
            .get('/events/getevent')
            .then((res) => {
                setEvents(res.data)
            })
            .catch((e) => alert(e.message))
    }, [])
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
                <Typography variant="h1" textAlign={'center'}>
                    Highlighted Event
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                    }}
                >
                    {events
                        ? events.map(({ _id, title }) => (
                            <li key={_id}>{title}</li>
                        ))
                        : null}
                </Box>
            </Box>
        </Box>
    )
}