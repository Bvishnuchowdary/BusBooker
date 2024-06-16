import express from 'express'
import { addroutes,fetchroutes } from '../controllers/routes.controller.js'
import protectroute from '../middlewares/protectRoute.js'

const router = express.Router()

router.post("/addroute",protectroute,addroutes)
router.get("/fetchroute",protectroute,fetchroutes)

export default router