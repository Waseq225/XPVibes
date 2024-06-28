import {
    Box,
    Button,
    Paper
} from '@mui/material';



export const Categories = () => {

    return (
        <Paper
            elevation={0}

            sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: 'teal',
                borderRadius: '0',
                padding: '10px 0'
            }}>

            <Box>
                <Button color='warning'>One</Button>
                <Button color='warning'>Two</Button>
                <Button color='warning'>Three</Button>
            </Box>
        </Paper>
    );
}