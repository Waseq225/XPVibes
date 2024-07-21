import {
    Box,
    Card,
    styled,
    Tab,
    Tabs,

} from '@mui/material'
import { PersonalDetails } from "../components/ProfileComponents/PersonalDetails"
import { OrderHistory } from "../components/ProfileComponents/OrderHistory"
import { PaymentDetails } from "../components/ProfileComponents/PaymentDetails"
import { DeleteAccount } from "../components/ProfileComponents/DeleteAccount"

import PropTypes from 'prop-types'
import * as React from 'react'


const StyledTabs = styled(Tabs)(({ theme }) => ({
    borderRight: 1,
    borderColor: 'divider',
    width: '20%',
    '& .MuiButtonBase-root': {
        textAlign: 'start',
        alignContent: 'start',
        '&.Mui-selected': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.common.white
        }
    }
}))

export const ProfilePage = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ display: "flex", width: "100%", alignContent: 'center', justifyContent: "center" }}>

            <Card
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', maxWidth: "1200px", marginTop: '3rem' }}
            >
                <StyledTabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"

                >
                    <Tab label="Personal Details" {...a11yProps(0)} />
                    <Tab label="Order History" {...a11yProps(1)} />
                    <Tab label="Payment Details" {...a11yProps(2)} />
                    <Tab label="Delete Account" {...a11yProps(3)} />

                </StyledTabs>
                <TabPanel value={value} index={0}>
                    <PersonalDetails />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <OrderHistory />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <PaymentDetails />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <DeleteAccount />
                </TabPanel>

            </Card>
        </Box>


    )
}


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            sx={{ width: '80%' }}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
