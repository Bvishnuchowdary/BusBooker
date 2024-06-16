import express from 'express'
import protectroute from '../middlewares/protectRoute.js'
import { addprices } from '../controllers/pricing.controllers.js'

const router = express.Router()

router.post("/addprices",protectroute,addprices)

export default router