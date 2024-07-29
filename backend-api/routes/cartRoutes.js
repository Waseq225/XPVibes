import express from 'express'
import { addToCart, getCart } from '../controllers/cartController.js'

const router = express.Router()

//User Cart items
router.get('/getCart', getCart)

//Add Items to cart
router.post('/addtocart', addToCart)

export default router
