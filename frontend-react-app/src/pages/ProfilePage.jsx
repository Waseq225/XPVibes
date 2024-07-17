import { PersonalDetails } from "../components/ProfileComponents/PersonalDetails"
import { Grid, Paper, Typography } from '@mui/material'
import { OrderHistory } from '../components/ProfileComponents/OrderHistory'
import { PaymentDetails } from '../components/ProfileComponents/PaymentDetails'
import { DeleteAccount } from '../components/ProfileComponents/DeleteAccount'

export const ProfilePage = () => {
    return (
        <Grid container spacing={3} style={{ padding: '2rem' }}>
            <Grid item xs={12} md={3}>
                <Paper style={{ padding: '1rem' }}>
                    <Typography variant="h5" gutterBottom >Personal Details</Typography>
                    <ul>
                        <li><PersonalDetails /></li>
                        <li><OrderHistory /></li>
                        <li><PaymentDetails /></li>
                        <li>Password</li>
                        <li><DeleteAccount /></li>
                    </ul>
                </Paper>
            </Grid>
            <Grid item xs={12} md={9}></Grid>
            
        </Grid>
    )
}
