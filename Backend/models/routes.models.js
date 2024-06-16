import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
    source: { type: String, required: true },
    destination: { type: String, required: true },
    travelTime: { type: String, required: true }, 
  },{timestamps: true});
  
  const Route = mongoose.model('Route', routeSchema);

  export default Route;
  