import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './Routes/auth.routes.js'
import connectToDatabase from './db/connectTomongoDB.js'
import routesRoutes from './Routes/location.routes.js'
import busRoutes from './Routes/bus.routes.js'
import pricingRoutes from './Routes/pricing.routes.js'
import scheduleRoutes from './Routes/schedule.routes.js'
import bookingRoutes from './Routes/booking.routes.js'

dotenv.config()
const app= express()
app.use(express.json())
app.use(cookieParser())

const PORT = 5000

app.use("/api/auth",authRoutes)
app.use("/api/routes",routesRoutes)
app.use("/api/buses",busRoutes)
app.use("/api/pricing",pricingRoutes)
app.use("/api/schedule",scheduleRoutes)
app.use("/api/booking",bookingRoutes)


app.get("/user/details",(req,res)=>{
    res.send('<h1>Inside user/details</h1>')
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
    connectToDatabase()
})