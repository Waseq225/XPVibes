import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'

import { DatePicker } from '@mui/x-date-pickers'
import { useContext, useRef, useState } from 'react'
import { UserContext } from '../../userContext'
import { app } from '../../firebase.js'
import { DateTime } from 'luxon'

export const PersonalDetails = () => {
  const { user, setUser } = useContext(UserContext)

  const fileRef = useRef(null)
  const [avatarUrl, setAvatarUrl] = useState(user.avatar)
  const [name, setName] = useState(user.name)
  const [dob, setDob] = useState(DateTime.fromISO(user.dob))
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)

  const [isAvatarUploading, setIsAvatarUploading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleClick = async (ev) => {
    ev.preventDefault()
    setIsUpdating(true)

    axios
      .post(`/user/update/${user._id}`, {
        email,
        name,
        dob,
        phone,
        avatar: avatarUrl,
      })
      .then((returned) => {
        const { avatar, dob, email, name, phone, _id } = returned.data

        setUser({
          avatar,
          dob,
          email,
          name,
          phone,
          _id,
        })

        setIsUpdating(false)
      })
      .catch((e) => {
        alert(e.message)
      })
  }

  const handleFileUpload = (file) => {
    if (!file) {
      return
    }

    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, `AvatarPhotos/${fileName}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    setIsAvatarUploading(true)

    uploadTask.on(
      'state_changed',
      () => { },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAvatarUrl(downloadURL)
          setIsAvatarUploading(false)
        })
      }
    )
  }

  return (
    <Box>
      <form
        id="personalDetails"
        onSubmit={handleClick}
        autoComplete="off"
      >
        <Typography variant="h4" gutterBottom>
          {user.name}
        </Typography>
        {isAvatarUploading ? (
          <CircularProgress sx={{ marginBottom: 3 }} />
        ) : (
          <Avatar
            onClick={() => fileRef.current.click()}
            src={avatarUrl}
            alt="profile"
            sx={{ marginBottom: 3 }}
          />
        )}

        <input
          onChange={(e) => handleFileUpload(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              fullWidth
              label="Email address"
              onChange={(ev) => setEmail(ev.target.value)}
              value={email}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="name"
              fullWidth
              label="Name"
              onChange={(ev) => setName(ev.target.value)}
              value={name}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              sx={{ width: '100%' }}
              label="Date of Birth"
              value={dob}
              onChange={(newValue) => setDob(newValue)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="phone"
              label="Mobile phone"
              onChange={(ev) => setPhone(ev.target.value)}
              value={phone}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              form="personalDetails"
              variant="contained"
              color="primary"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <CircularProgress
                  color="text"
                  size="1rem"
                  sx={{ marginRight: 1 }}
                />
              ) : null}
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}
