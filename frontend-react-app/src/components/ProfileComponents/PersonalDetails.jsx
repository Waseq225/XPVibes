import React, { useEffect, useContext } from 'react'
import { Grid, Paper, Typography, TextField, Button, Avatar } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../../userContext';
import { PaymentDetails } from './PaymentDetails';
import { OrderHistory } from './OrderHistory';
import { DeleteAccount } from './DeleteAccount';

export const PersonalDetails = () => {
  const { user, setUser } = useContext(UserContext)
  useEffect(() => {
    axios
      .get('/user/profileDetails')
      .then(({ data }) => {
        setUser(data)
      })
      .catch((e) => alert(e.message))
  }, [])
  return (
    <Grid container spacing={3} style={{ padding: '2rem' }}>
      <Grid item xs={12} md={3}>
        <Paper style={{ padding: '1rem' }}>
          <Typography variant="h5" gutterBottom >Personal Details</Typography>
          <ul>
            <li><OrderHistory /></li>
            <li><PaymentDetails /></li>
            <li>Password</li>
            <li><DeleteAccount /></li>
          </ul>
        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <Paper style={{ padding: '2rem' }}>
          <Typography variant="h4" gutterBottom >{user.name}</Typography>
          <Avatar
            sx={{ width: 24, height: 24, marginRight: 1 }}
            src={user.avatar}
          />
          <Typography variant="subtitle1" gutterBottom>ID?</Typography>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email address" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="First Name" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Last Name" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Mobile phone" required />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField fullWidth label="Address line 1" required />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField fullWidth label="Address line 2" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Suburb" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Country Code" required />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary">Save</Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

