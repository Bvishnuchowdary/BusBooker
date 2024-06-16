import express from 'express'
import { signup,login,logout } from '../controllers/auth.user.controller.js'
import { Asignup,Alogin,Alogout } from '../controllers/auth.admin.controller.js'

const router = express.Router()

router.post("/user/signup",signup);
router.post("/user/login",login)
router.post("/user/logout",logout)

router.post("/admin/signup",Asignup);
router.post("/admin/login",Alogin);
router.post("/admin/logout",Alogout);



export default router