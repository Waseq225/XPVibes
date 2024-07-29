import axios from "axios"
import { useEffect, useState } from "react"


export const Cart = () => {

    const [cart, setCart] = useState([])

    useEffect(() => {
        axios
            .get(`/cart/getCart`)
            .then((res) => {
                setCart(res.data)
            })
            .catch((e) => alert(e.message))
    }, [])


    return (
        <ul>
            {cart ? cart.map((item) => (
                <li key={item._id}> {item.event.title} - {item.numberOfTickets}</li>
            )) : null}
        </ul>
    )
}
