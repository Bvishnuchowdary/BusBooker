import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
    route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    availableSeats: { type: Number, required: true },
  },{timestamps: true});
  
  const Schedule = mongoose.model('Schedule', scheduleSchema);
  export default Schedule;
  