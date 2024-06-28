import {
    Search
} from '@mui/icons-material';
import {
    IconButton,
    InputBase,
    Paper
} from '@mui/material';

export const SearchBar = () => {
    return (
        <Paper
            component="form"
            elevation={0}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', border: '1px solid currentcolor' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for artist, event, venue, location..."
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <Search />
            </IconButton>

        </Paper>
    )
}
