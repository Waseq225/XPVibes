import {
    Card,
    CardActions,
    CardActionArea,
    CardContent,
    CardMedia,
    Button,
    Typography
} from '@mui/material'
import axios from 'axios'


export const EventItem = ({ event }) => {

    const { title, photos, description, price, ticketsAvailable, _id } = event

    const addToCart = async () => {

        axios
            .post('/cart/addtocart', {
                eventId: _id,
                numberOfTickets: 1
            })
            .then((cart) => {
                console.log(cart)
            })
            .catch((e) => alert(e.message))
    }

    return (
        <Card sx={{ width: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="250"
                    image={photos[0]}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price Per Ticket: {price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Tickets Available: {ticketsAvailable}
                    </Typography>

                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={addToCart}>
                    Add To Cart
                </Button>
            </CardActions>
        </Card>
    )
}

