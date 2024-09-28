import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Schedules = () => {
  const { state } = useLocation();
  const { schedule } = state; // Accessing the bus details passed from the Dashboard
  const [numSeats, setNumSeats] = useState(1);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // For navigation after booking

  const handleSeatSelection = (e) => {
    setNumSeats(e.target.value);
  };

  const handleLogout = async () => {
    try {
      const url = 'http://localhost:5000/api/auth/user/logout';
      const response = await axios.post(url, { withCredentials: true });

      if (response.status === 200) {
        navigate('/login');
      } else {
        console.error('Logout failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleConfirmBooking = async () => {
    setLoading(true); // Start loading when booking starts
    try {
      const url = 'http://localhost:5000/api/booking/add';
      const response = await axios.post(
        url,
        {
          scheduleid: schedule._id,
          seatsnumber: numSeats,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Redirect to Ticket Details page with booking data
        navigate('/ticket-details', { state: { booking: response.data.booking } });
      } else {
        console.error('Booking failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error booking seats:', error);
    } finally {
      setLoading(false); // Stop loading after the booking process is completed
    }
  };

  return (
    <div className="w-full max-w-4xl p-6 mx-auto">
      {/* Header Section */}
      <header className="flex items-center justify-between py-4 mb-6 border-b-2 border-gray-200">
        <div className="text-2xl font-bold text-indigo-600">BusBooker</div>
        <nav className="space-x-4 text-sm sm:text-base">
          <a href="#" className="hover:text-indigo-600">Flights</a>
          <a href="#" className="hover:text-indigo-600">Hotels</a>
          <a href="#" className="hover:text-indigo-600">Buses</a>
        </nav>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Logout
        </button>
      </header>

      {/* Bus Details Section */}
      <div className="p-6 mb-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center text-indigo-600">Bus Details</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-lg font-semibold">Operator: <span className="font-normal">{schedule.bus.operator}</span></p>
            <p className="mb-2 text-lg font-semibold">Bus Number: <span className="font-normal">{schedule.bus.busNumber}</span></p>
            <p className="mb-2 text-lg font-semibold">Type: <span className="font-normal">{schedule.bus.type}</span></p>
          </div>
          <div>
            <p className="mb-2 text-lg font-semibold">From: <span className="font-normal">{schedule.route.source}</span></p>
            <p className="mb-2 text-lg font-semibold">To: <span className="font-normal">{schedule.route.destination}</span></p>
            <p className="mb-2 text-lg font-semibold">Departure: <span className="font-normal">{new Date(schedule.departureTime).toLocaleString()}</span></p>
            <p className="mb-2 text-lg font-semibold">Arrival: <span className="font-normal">{new Date(schedule.arrivalTime).toLocaleString()}</span></p>
            <p className="mb-2 text-lg font-semibold">Available Seats: <span className="font-normal">{schedule.availableSeats}</span></p>
          </div>
        </div>
      </div>

      {/* Seat Selection Section */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Select Number of Seats</h2>
        <select
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={numSeats}
          onChange={handleSeatSelection}
        >
          {[...Array(schedule.availableSeats).keys()].map((seat) => (
            <option key={seat + 1} value={seat + 1}>
              {seat + 1}
            </option>
          ))}
        </select>

        {/* Confirm Booking Button */}
        <div className="text-center">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
              <p className="ml-3 text-lg font-medium">Booking in progress...</p>
            </div>
          ) : (
            <button
              onClick={handleConfirmBooking}
              className="w-full px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedules;
