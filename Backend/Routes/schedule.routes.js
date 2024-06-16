import express from 'express'
import protectroute from '../middlewares/protectRoute.js'
import { newschedule ,fetchschedules} from '../controllers/schedule.controller.js'

const router = express.Router()

router.post("/add",protectroute,newschedule)
router.get("/fetch",protectroute,fetchschedules)

export default router