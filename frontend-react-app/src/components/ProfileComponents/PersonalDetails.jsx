import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { UserContext } from '../../userContext';

import { app } from '../../firebase.js';

export const PersonalDetails = () => {
  const { user, setUser } = useContext(UserContext)
  const fileRef = useRef(null)
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios
      .get('/user/profile')
      .then(({ data }) => {
        setUser(data)

      })
      .catch((e) => alert(e.message))
  }, [setUser])


  const handleFileUpload = (file) => {
    if (!file) { return }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(Math.round(progress));
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData((priordata) => { return { ...priordata, avatar: downloadURL } })
        );
      }
    );
  };

  const avatarSrc = useMemo(() => formData.avatar || user.avatar, [formData, user])

  return (
    <Box>
      <Typography variant="h4" gutterBottom >{user.name}</Typography>
      <Avatar onClick={() => fileRef.current.click()}
        src={avatarSrc}
        alt='profile' />
      <input
        onChange={(e) => handleFileUpload(e.target.files[0])}
        type='file'
        ref={fileRef}
        hidden
        accept="image/*" />
      <Typography variant="subtitle1" gutterBottom>ID?</Typography>

      <form noValidate autoComplete="off">
        <Grid container spacing={3} >
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
    </Box>
  );
}


