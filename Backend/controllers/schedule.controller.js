import Schedule from "../models/schedule.models.js";
import Bus from "../models/buses.models.js";
import Route from "../models/routes.models.js";
import SeatPricing from "../models/seatPricing.models.js";

export const newschedule = async (req, res) => {
  try {
    const { busnumber, source, destination, departure, arrival, cost } = req.body;

    // Find the bus by bus number
    const bus = await Bus.findOne({ busNumber: busnumber });
    if (!bus) {
      return res.status(400).json({ error: "Provided Busnumber does not exist" });
    }

    // Find the route by source and destination
    const route = await Route.findOne({ source, destination });
    if (!route) {
      return res.status(400).json({ error: "Route does not exist between provided source and destination" });
    }

    // Check if a schedule already exists for the bus on the given route with the same departure and arrival times
    const existingSchedule = await Schedule.findOne({
      bus: bus._id,
      route: route._id,
      departureTime: departure,
      arrivalTime: arrival,
    });
    if (existingSchedule) {
      return res.status(400).json({ error: "Schedule already exists for the provided details" });
    }

    // Create a new schedule
    const newSchedule = new Schedule({
      bus: bus._id,
      route: route._id,
      departureTime: departure,
      arrivalTime: arrival,
      availableSeats: bus.seats,
    });

    // Save the new schedule
    await newSchedule.save();

    // Create a new SeatPricing entry
    const seatPricing = new SeatPricing({
      bus: bus._id,
      route: route._id,
      seatCost: cost,
    });

    // Save the new SeatPricing
    await seatPricing.save();

    return res.status(201).json({ message: "Schedule and pricing added successfully", schedule: newSchedule, seatPricing });

  } catch (error) {
    console.error("Error occurred inside the newschedule controller:", error);
    res.status(500).json({ error: "An error occurred while adding the schedule" });
  }
};



export const fetchschedules = async (req, res) => {
  try {
    const { source, destination } = req.body;

    // Find the route by source and destination
    const route = await Route.findOne({ source, destination });
    if (!route) {
      return res.status(400).json({ error: "Route does not exist between provided source and destination" });
    }

    // Find schedules for the given route
    const schedules = await Schedule.find({ route: route._id }).populate('bus route');
    if (!schedules.length) {
      return res.status(404).json({ error: "No schedules exist for the provided source and destination" });
    }

    // Return the found schedules
    return res.status(200).json({ message: "Schedules fetched successfully", schedules });

  } catch (error) {
    console.error("Error occurred inside the fetchschedules controller:", error);
    res.status(500).json({ error: "An error occurred while fetching the schedule" });
  }
};

export const fetchAllSchedules = async (req, res) => {
  try {
  
    // Find the route by source and destination
    const route = await Route.findOne({ source, destination });
    if (!route) {
      return res.status(400).json({ error: "Route does not exist between provided source and destination" });
    }

    // Find schedules for the given route
    const schedules = await Schedule.find({ route: route._id }).populate('bus route');
    if (!schedules.length) {
      return res.status(404).json({ error: "No schedules exist for the provided source and destination" });
    }

    // Return the found schedules
    return res.status(200).json({ message: "Schedules fetched successfully", schedules });

  } catch (error) {
    console.error("Error occurred inside the fetchschedules controller:", error);
    res.status(500).json({ error: "An error occurred while fetching the schedule" });
  }
};


