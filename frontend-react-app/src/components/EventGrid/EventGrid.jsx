import axios from 'axios'
import { Box, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { EventItem } from './EventItem/EventItem'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { UserContext } from '../../userContext'
import { useContext } from 'react'

export const EventGrid = () => {
    const [events, setEvents] = useState([])

    const { user } = useContext(UserContext)

    const [, setCartItems] = useLocalStorage('cart', [])

    const addToCart = async (
        eventId, numberOfTickets
    ) => {
        if (user) {
            axios
                .post('/cart/addtocart', {
                    eventId,
                    numberOfTickets,
                })
                .then((cart) => {
                    console.log(cart)
                })
                .catch((e) => alert(e.message))
        } else {
            setCartItems((prevValue) => [
                ...prevValue,
                {
                    eventId,
                    numberOfTickets,
                },
            ])
        }
    }




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
                }}
            >
                <Typography variant="h1" textAlign={'center'}>
                    Highlighted Event
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                    }}
                >

                    {events
                        ? events.map((event) => (
                            <EventItem key={event._id} 
                            addToCart={addToCart}
                            event={event} />
                        ))
                        : null}
                </Box>
            </Box>
        </Box>


    )
}
