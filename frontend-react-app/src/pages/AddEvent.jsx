import axios from 'axios'
import {
    Box,
    Button,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    TextField,
    Typography,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { useRef, useState } from 'react'
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'
import { Close } from '@mui/icons-material'

export const AddEvent = () => {
    const [startDate, setStartDate] = useState(null)

    const fileRef = useRef(null)
    const [photoUrls, setPhotoUrls] = useState([])
    const storage = getStorage(app)

    const stringFields = [
        'title',
        'venue',
        'description',
        // "extraInfo",
        'categories',
    ]

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
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(Math.round(progress))
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    setPhotoUrls((previousState) => [
                        ...previousState,
                        downloadURL,
                    ])
                )
                console.log({ photoUrls })
            }
        )
    }

    const addEvent = async (ev) => {
        ev.preventDefault()

        const [
            title,
            venue,
            description,
            // extraInfo,
            categories,
        ] = stringFields.map((field) => ev.target.elements[field].value)

        // const photos = ev.target.elements.photos.value //Need to fix this
        const price = ev.target.elements.price.value
        const ticketsAvailable = ev.target.elements.ticketsAvailable.value

        console.log({
            title,
            venue,
            description,
            // extraInfo,
            categories,
            startDate,
        })

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
                alert('Event input successful')
            })
            .catch((e) => alert(e.message))
    }

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '5rem',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    width: '450px',
                }}
            >
                <Typography variant="h1" textAlign={'center'}>
                    Add Event
                </Typography>
                <form id="addEventform" onSubmit={addEvent}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                        }}
                    >
                        {stringFields.map((field) => (
                            <TextField
                                key={field}
                                id={field}
                                label={field}
                                type="text"
                                variant="outlined"
                            />
                        ))}

                        <TextField
                            id="price"
                            label="price"
                            type="number"
                            variant="outlined"
                        />

                        <TextField
                            id="ticketsAvailable"
                            label="ticketsAvailable"
                            type="number"
                            variant="outlined"
                        />

                        <DateTimePicker
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                        />
                    </Box>
                </form>

                <Button
                    onClick={() => fileRef.current.click()}
                    variant="contained"
                >
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
                </ImageList>
                <Button type="submit" form="addEventform" variant="contained">
                    Add your Event
                </Button>
            </Box>
        </Box>
    )
}
