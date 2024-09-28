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
        console.log(response.data.message); // Assuming the response has a message property
        navigate('/login');
      } else {
        // Handle any other response status
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
    <div className="w-screen p-6 mx-auto bg-white rounded-lg shadow-lg">
      <header className="flex items-center justify-between py-4">
        <div className="text-2xl font-bold">BusBooker</div>
        <nav className="space-x-4">
          <a href="#" className="text-blue-600">Flights</a>
          <a href="#" className="text-blue-600">Hotels</a>
          <a href="#" className="text-blue-600">Homestays & Villas</a>
          <a href="#" className="text-blue-600">Holiday Packages</a>
          <a href="#" className="text-blue-600">Trains</a>
          <a href="#" className="text-blue-600">Buses</a>
          <a href="#" className="text-blue-600">Cabs</a>
          <a href="#" className="text-blue-600">Forex Card & Currency</a>
        </nav>
        <button onClick={handleLogout} className="px-4 py-2 text-white bg-blue-600 rounded">Logout</button>
      </header>
      <h1 className="mb-6 text-2xl font-bold text-center text-indigo-600">Bus Booking</h1>

      <div className="p-4 rounded-lg shadow-sm bg-gray-50">
        <h2 className="text-xl font-semibold">Bus Details</h2>
        <p><strong>Operator:</strong> {schedule.bus.operator}</p>
        <p><strong>Bus Number:</strong> {schedule.bus.busNumber}</p>
        <p><strong>Type:</strong> {schedule.bus.type}</p>
        <p><strong>From:</strong> {schedule.route.source} <strong>To:</strong> {schedule.route.destination}</p>
        <p><strong>Departure:</strong> {new Date(schedule.departureTime).toLocaleString()}</p>
        <p><strong>Arrival:</strong> {new Date(schedule.arrivalTime).toLocaleString()}</p>
        <p><strong>Available Seats:</strong> {schedule.availableSeats}</p>
      </div>

      <div className="p-4 mt-6 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold">Select Number of Seats</h2>
        <select
          className="w-full p-2 mt-2 border rounded"
          value={numSeats}
          onChange={handleSeatSelection}
        >
          {[...Array(schedule.availableSeats).keys()].map((seat) => (
            <option key={seat + 1} value={seat + 1}>
              {seat + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 text-center">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <p className="ml-3 text-lg font-medium">Booking in progress...</p>
          </div>
        ) : (
          <button
            className="px-6 py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            onClick={handleConfirmBooking}
          >
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default Schedules;
