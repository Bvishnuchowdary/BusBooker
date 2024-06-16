import express from 'express'
import protectroute from '../middlewares/protectRoute.js'
import { addbus,fetchbuses } from '../controllers/buses.controller.js'

const router = express.Router()

router.post("/addbus",protectroute,addbus)
router.get("/fetchbuses",protectroute,fetchbuses)

export default router