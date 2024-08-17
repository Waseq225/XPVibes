import {
    Card,
    CardActions,
    CardActionArea,
    CardContent,
    CardMedia,
    Button,
    Typography,
    styled,
} from '@mui/material'

// Change specific css here for the popup menu
const StyledCard = styled(
    Card
)(() => ({

    width: 345,
    transition: 'width 1s ease 0s',
    '&:hover': {
        width: 600

    },
}));



export const EventItem = ({ event, addToCart }) => {

    const { title, photos, description, price, ticketsAvailable, _id } = event

    const handleAddToCart = () => {
        addToCart(_id, 1)
    }

    return (
        <StyledCard>
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
                <Button size="small" color="primary" onClick={handleAddToCart}>
                    Add To Cart
                </Button>
            </CardActions>
        </StyledCard>
    )
}
