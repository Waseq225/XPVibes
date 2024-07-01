import axios from 'axios'
import { Box, Button, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";



export const AddEvent = () => {

    const [startDate, setStartDate] = useState(null)


    const stringFields = [

        "title",
        "venue",
        "photos",
        "description",
        "extraInfo",
        "categories",
    ]


    const addEvent = async (ev) => {

        ev.preventDefault();

        const [
            title,
            venue,
            photos,
            description,
            extraInfo,
            categories,
        ] = stringFields.map(field => ev.target.elements[field].value)

        const price = ev.target.elements.price.value
        const ticketsAvailable = ev.target.elements.ticketsAvailable.value


        console.log({
            title,
            venue,
            photos,
            description,
            extraInfo,
            categories,
            startDate,
        })


        const {
            year,
            month,
            day,
            hour,
            minute,
        } = startDate.c

        axios.post('/addEvent', {
            title,
            venue,
            photos,
            description,
            extraInfo,
            categories,
            price,
            ticketsAvailable,
            startDate: new Date(
                year,
                month - 1,
                day,
                hour,
                minute,
            )
        }).then(() => {
            alert('Event input successful')
        }).catch((e) => alert(e.message)
        )

    }
    return (
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: '5rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '450px' }}>
                <Typography variant="h1" textAlign={'center'} >Add Event</Typography>
                <form id='addEventform' onSubmit={addEvent}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {stringFields.map((field) =>

                            <TextField
                                key={field}
                                id={field}
                                label={field}
                                type="text"
                                variant="outlined"
                            />)

                        }

                        <TextField
                            id="price"
                            label="price"
                            type="number"
                            variant="outlined"
                        />

                        <TextField
                            id="ticketsAvailable"
                            label="ticketsAvailable"
                            type="number"
                            variant="outlined"
                        />

                        <DateTimePicker
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                        />


                        <Button type='submit' form='addEventform' variant="contained"> addEvent </Button>

                    </Box>
                </form>
            </Box>
        </Box>
    );
}
