import {
    Science,
    ShoppingCart
} from '@mui/icons-material';
import {
    Box,
    IconButton
} from '@mui/material';
import { Link } from "react-router-dom";
import { Hamburger } from './Hamburger/Hamburger';
import { SearchBar } from './SearchBar/SearchBar';



export const Nav = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
            <Link to={'/'}>
                <Box>
                    <Science />
                </Box>
            </Link>

            <Box sx={{ flexBasis: '50%' }}>
                <SearchBar />
            </Box>
            <Box sx={{
                display: 'flex',

            }}>
                <Link to={'/cart'}>
                    <IconButton id="demo-customized-button"
                        variant="contained"
                    >
                        <ShoppingCart />
                    </IconButton>
                </Link>
                <Hamburger />
            </Box>
        </Box>
    );
}