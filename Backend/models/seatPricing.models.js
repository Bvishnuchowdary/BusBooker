import mongoose from "mongoose";

const seatPricingSchema = new mongoose.Schema({
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  seatCost: { type: Number, required: true }
}, { timestamps: true });

const SeatPricing = mongoose.model('SeatPricing', seatPricingSchema);
export default SeatPricing;
