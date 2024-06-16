import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    operator: { type: String, required: true },
    busNumber: { type: String, required: true, unique: true },
    type: { type: String, required: true }, 
    seats: { type: Number, required: true },
    amenities: [String],
  },{timestamps: true});
  
  const Bus = mongoose.model('Bus', busSchema);
  export default Bus;
  