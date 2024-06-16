import Bus from "../models/buses.models.js";
import Route from "../models/routes.models.js";
import SeatPricing from "../models/seatPricing.models.js";

export const addprices = async (req, res) => {
  try {
    const { busnumber, source, destination, seatprice } = req.body;

    // Find the bus by bus number
    const bus = await Bus.findOne({ busNumber: busnumber });
    if (!bus) {
      return res.status(400).json({ error: 'No buses are present with the provided busnumber' });
    }

    // Find the route by source and destination
    const route = await Route.findOne({ source, destination });
    if (!route) {
      return res.status(400).json({ error: 'No routes are available between the provided source and destination' });
    }

    // Find existing seat pricing for the bus and route combination
    const existingprice = await SeatPricing.findOne({ bus: bus._id, route: route._id });
    if (existingprice) {
      // Update the existing price
      existingprice.seatCost = seatprice;
      await existingprice.save();
      return res.status(200).json({ message: 'Seat pricing updated successfully', pricing: existingprice });
    } else {
      // Create new seat pricing
      const newprice = new SeatPricing({
        bus: bus._id,
        route: route._id,
        seatCost: seatprice,
      });
      await newprice.save();
      return res.status(201).json({ message: 'Seat pricing added successfully', pricing: newprice });
    }
  } catch (error) {
    console.error("Error occurred inside the addprices function:", error);
    res.status(500).json({ error: 'An error occurred while adding price' });
  }
};
