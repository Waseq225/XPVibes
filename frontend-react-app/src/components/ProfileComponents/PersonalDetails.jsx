// import React from 'react'

import { Box, Button, TextField, Typography } from "@mui/material"


export const PersonalDetails = () => {
    return (
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: '5rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '750px' }}>
                <Typography variant="h2" textAlign={'center'} >Personal Details</Typography>
                <form id='registerform'>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <TextField required
                            id="username"
                            label="Name"
                            type="text"
                            variant="outlined"
                            value=""
                            focused
                        />
                        <TextField required
                            id="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            focused
                        />
                        <TextField required
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                        />
                    </Box>
                </form>
            </Box>
        </Box>
    )
}
