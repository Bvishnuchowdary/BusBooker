import Booking from "../models/bookings.models.js";
import Schedule from "../models/schedule.models.js";
import SeatPricing from "../models/seatPricing.models.js";
import User from "../models/user.models.js";
import Bus from "../models/buses.models.js";

export const newbooking = async (req, res) => {
  try {
    // Extract user ID from the authenticated request
    const userid = req.user._id;
    const { scheduleid, seatsnumber } = req.body;

    // Find the schedule
    const schedule = await Schedule.findOne({ _id: scheduleid }).populate('bus');
    if (!schedule) {
      return res.status(400).json({ error: "Provided schedule does not exist" });
    }

    // Check if there are enough available seats
    if (schedule.availableSeats < seatsnumber) {
      return res.status(400).json({ error: "Not enough available seats" });
    }

    // Find the pricing for the given bus and route
    const pricing = await SeatPricing.findOne({ bus: schedule.bus, route: schedule.route });
    if (!pricing) {
      return res.status(400).json({ error: "Pricing details do not exist for the provided schedule" });
    }

    // Calculate the total price
    const price = seatsnumber * pricing.seatCost;

    // Create a new booking
    const newBooking = new Booking({
      user: userid,
      schedule: schedule._id,
      seatsBooked: seatsnumber,
      totalPrice: price,
      bookingStatus: "confirmed",
    });

    // Update the available seats in the schedule
    schedule.availableSeats -= seatsnumber;
    await schedule.save();

    // Save the new booking
    await newBooking.save();

    // Populate user, schedule, and bus details
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate('user', '-password') // Exclude password
      .populate({
        path: 'schedule',
        populate: {
          path: 'bus',
        },
      });

    // Send a successful response with populated details
    return res.status(200).json({
      message: "Booking created successfully",
      booking: populatedBooking
    });

  } catch (error) {
    console.error("Error occurred while adding a new booking:", error);
    res.status(500).json({ error: "An error occurred while performing a new booking" });
  }
};
