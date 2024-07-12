import { alpha, styled } from '@mui/material/styles';
import React, { useContext } from 'react';
// import axios from 'axios'
import {
    AccountBox,
    HelpOutline,
    Menu as MenuIcon,
    Person,
    Receipt
} from '@mui/icons-material';
import {
    Divider,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../userContext';


// Change specific css here for the popup menu
const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export const Hamburger = () => {

    const { user } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <IconButton id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                elevation={2}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{ width: '400px' }}
            >
                {user ?
                    (<Link to={'profile'}><MenuItem onClick={handleClose}>
                        <AccountBox />
                        {user.name}&apos;s Profile
                    </MenuItem></Link>)
                    : (<Link to={'login'}>
                        <MenuItem onClick={handleClose}>
                            <Person />
                            Login / Sign Up
                        </MenuItem>
                    </Link>)}


                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose}>
                    <Receipt />
                    My Purchases
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>
                    <ConfirmationNumber />
                    FAQs
                </MenuItem> */}
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose}>
                    <HelpOutline />
                    Help
                </MenuItem>

                {user ? (

                    <Divider sx={{ my: 0.5 }} />

                ) : null}
                {user ? (


                    <Link to={'logout'}>
                        <MenuItem onClick={handleClose}>
                            <HelpOutline />
                            Sign Out
                        </MenuItem>
                    </Link>

                ) : null}
            </StyledMenu>
        </div>
    );
}