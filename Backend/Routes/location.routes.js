import express from 'express'
import { addroutes,fetchroutes,fetchroutesWithSourceAndDest } from '../controllers/routes.controller.js'
import protectroute from '../middlewares/protectRoute.js'

const router = express.Router()

router.post("/addroute",protectroute,addroutes)
router.get("/fetchroute",protectroute,fetchroutes)
router.get("/fetchroutesSD",protectroute,fetchroutesWithSourceAndDest)

export default router