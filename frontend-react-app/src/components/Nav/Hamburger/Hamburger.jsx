import {
    HelpOutline,
    Menu as MenuIcon,
    Person,
    Receipt
} from '@mui/icons-material';
import {
    Avatar,
    Divider,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../userContext';
import { SnackbarContext } from '../../../snackbarContext';


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

    const { user, setUser, setHasOrganizerPermission } = useContext(UserContext);
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const { setToastOpen, setToastText } = useContext(SnackbarContext)

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        if (user) {
            axios.get('/auth/logout')
                .then(() => {
                    setUser(null)
                    setHasOrganizerPermission(false)
                    setToastText("Signed out successfully")
                    setToastOpen(true)
                }).catch((e) =>
                    alert('Logout failed' + e)
                )
        }
        handleClose()
        navigate('/')
    }


    return (
        <div>
            <IconButton id="dropdown-button"
                aria-controls={open ? 'dropdown-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                onClick={handleClick}
                size='large'
                edge='end'
                color='inherit'
            >
                <MenuIcon />
            </IconButton>
            <StyledMenu
                id="dropdown-menu"
                MenuListProps={{
                    'aria-labelledby': 'dropdown-button',
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
                        <Avatar
                            sx={{ width: 24, height: 24, marginRight: 1 }}
                            src={user.avatar}
                        />
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

                    <MenuItem onClick={handleLogout}>
                        <HelpOutline />
                        Sign Out
                    </MenuItem>

                ) : null}
            </StyledMenu>

        </div>
    );
}