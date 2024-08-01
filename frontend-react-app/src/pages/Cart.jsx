import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { UserContext } from '../userContext'

export const Cart = () => {
    const { user } = useContext(UserContext)

    const [cart, setCart] = useState([])

    const [cartItems] = useLocalStorage('cart', [])

    useEffect(() => {
        if (user) {
            axios
                .get(`/cart/getCart`)
                .then((res) => {
                    setCart(res.data)
                })
                .catch((e) => alert(e.message))
        } else {
            const stringOfIdsForParam = cartItems.map((item) => item.eventId).join('&ids=')

            axios
                .get(`/events/geteventsbyids/?ids=${stringOfIdsForParam}`)
                .then((res) => {
                    const cart = cartItems.map((item, index) => ({
                        ...item,
                        _id: index,
                        event: res.data.find((x) => x._id === item.eventId),
                    }))

                    setCart(cart)
                })
                .catch((e) => alert(e.message))
        }
    }, [cartItems, user])

    return (
        <ul>
            {cart
                ? cart.map((item) => (
                    <li key={item._id}>
                        {item.event.title} - {item.numberOfTickets}
                    </li>
                ))
                : null}
        </ul>
    )
}
