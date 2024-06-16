import express from 'express'
import protectroute from '../middlewares/protectRoute.js'
import { newbooking } from '../controllers/booking.controller.js'

const router = express.Router()

router.post("/add",protectroute,newbooking)

export default router;