import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', required: true },
    seatsBooked: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    bookingStatus: { type: String, required: true, enum: ['confirmed', 'cancelled'] },
  },{timestamps: true});
  
  const Booking = mongoose.model('Booking', bookingSchema);
  export default Booking;




