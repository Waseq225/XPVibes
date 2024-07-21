import {
    Event,
    Science,
    ShoppingCart
} from '@mui/icons-material';
import {
    AppBar,
    Box,
    IconButton,
    InputBase,
    Toolbar,
    Typography,
    styled
} from '@mui/material';
import { Link } from "react-router-dom";
import { Hamburger } from './Hamburger/Hamburger';

import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { UserContext } from '../../userContext';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '0ch',
            '&:focus': {
                width: '25ch',
                borderBottom: '1px solid white'
            },
        },
    },
}));

//convert to App bar
export const Navbar = () => {
    const { hasOrganizerPermission } = useContext(UserContext);


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Box
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        <Link to={'/'} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                            <Science />
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"

                            >
                                Vibology
                            </Typography>
                        </Link>
                    </Box>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    {hasOrganizerPermission ? <Link to={'/addevent'}>
                        <IconButton color='inherit'
                            variant="contained"
                        >
                            < Event />
                        </IconButton>
                    </Link> : null}
                    <Link to={'/cart'}>
                        <IconButton color='inherit'
                            variant="contained"
                        >
                            <ShoppingCart />
                        </IconButton>
                    </Link>
                    <Hamburger />
                </Toolbar>
            </AppBar>
        </Box>
    );
}