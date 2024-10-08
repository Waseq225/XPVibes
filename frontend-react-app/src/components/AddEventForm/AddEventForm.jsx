import { Close } from '@mui/icons-material'
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    TextField,
    Typography,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import axios from 'axios'
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage'
import { useRef, useState } from 'react'
import { app } from '../../firebase'


export const AddEventForm = () => {

    const [title, setTitle] = useState(null)
    const [venue, setVenue] = useState(null)
    const [description, setDescription] = useState(null)
    const [categories, setCategories] = useState(null)
    const [price, setPrice] = useState(null)
    const [ticketsAvailable, setTicketsAvailable] = useState(null)
    const [startDate, setStartDate] = useState(null)


    const fileRef = useRef(null)
    const [photoUrls, setPhotoUrls] = useState([])
    const storage = getStorage(app)
    const [isPhotoUploading, setIsPhotoUploading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)


    // const clearForm = () => {
    //     setTitle('')
    //     setVenue('')
    //     setDescription('')
    //     setCategories('')
    //     setPrice('')
    //     setTicketsAvailable('')
    //     setStartDate(null)
    // }

    const removeImage = (imageUrl) => {
        const httpsReference = ref(storage, imageUrl)
        deleteObject(httpsReference)
            .then(() => {
                setPhotoUrls((previousPhotoUrls) =>
                    previousPhotoUrls.filter(
                        (photoUrl) => photoUrl !== imageUrl
                    )
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleFileUpload = (file) => {
        if (!file) {
            return
        }
        // look into firebase storage folders to separate events and users

        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, `EventPhotos/${fileName}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        setIsPhotoUploading(true)

        uploadTask.on(
            'state_changed',
            () => {

            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setPhotoUrls((previousState) => [
                        ...previousState,
                        downloadURL,
                    ])
                    setIsPhotoUploading(false)
                }
                )
                console.log({ photoUrls })
            }
        )
    }

    const addEvent = async (ev) => {
        ev.preventDefault()
        setIsSubmitting(true)
        const { year, month, day, hour, minute } = startDate.c

        axios
            .post('/events/addEvent', {
                title,
                venue,
                description,
                // extraInfo,
                photos: photoUrls,
                categories,
                price,
                ticketsAvailable,
                startDate: new Date(year, month - 1, day, hour, minute),
            })
            .then(() => {
                setTitle(null)
                setVenue(null)
                setDescription(null)
                setCategories(null)
                setPrice(null)
                setTicketsAvailable(null)
                setStartDate(null)
                setIsSubmitting(false)
            })
            .catch((e) => alert(e.message))
    }



    return (
        <>
            <Typography variant="h1" textAlign={'center'}>
                Add Event
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                }}
            >
                <TextField
                    id="title"
                    label="Title"
                    type="text"
                    variant="outlined"
                    onChange={(newValue) => setTitle(newValue.target.value)}
                />
                <TextField
                    id="venue"
                    label="Venue"
                    type="text"
                    variant="outlined"
                    onChange={(newValue) => setVenue(newValue.target.value)}
                />
                <TextField
                    id="description"
                    label="Description"
                    type="text"
                    variant="outlined"
                    onChange={(newValue) =>
                        setDescription(newValue.target.value)
                    }
                />
                <TextField
                    id="categories"
                    label="Categories"
                    type="text"
                    variant="outlined"
                    onChange={(newValue) =>
                        setCategories(newValue.target.value)
                    }
                />

                <TextField
                    id="price"
                    label="Price"
                    type="number"
                    variant="outlined"
                    onChange={(newValue) => setPrice(newValue.target.value)}
                />

                <TextField
                    id="ticketsAvailable"
                    label="Tickets Available"
                    type="number"
                    variant="outlined"
                    onChange={(newValue) =>
                        setTicketsAvailable(newValue.target.value)
                    }
                />

                <DateTimePicker
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                />
            </Box>

            <Button onClick={() => fileRef.current.click()} variant="contained">
                Upload Photo
            </Button>
            <input
                onChange={(e) => handleFileUpload(e.target.files[0])}
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
            />
            <ImageList
                sx={{ width: 500, height: 'auto' }}
                cols={3}
                rowHeight={164}
            >

                {photoUrls.map((item) => (
                    <ImageListItem key={item}>
                        <img src={item} alt={item} />

                        <ImageListItemBar
                            position="top"
                            actionIcon={
                                <IconButton
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.54)',
                                    }}
                                    onClick={() => removeImage(item)}
                                >
                                    <Close />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
                {isPhotoUploading ? <ImageListItem sx={{ backgroundColor: 'lightgrey' }}>
                    <CircularProgress sx={{ margin: 'auto' }} />
                </ImageListItem> : null}
            </ImageList>
            <Button 
            onClick={addEvent} variant="contained"  disabled={isSubmitting}>
               
              {isSubmitting ? <CircularProgress color='text' size='1rem' sx={{ marginRight: 1 }} /> : null}
              Add your Event
            </Button>
        </>
    )
}
