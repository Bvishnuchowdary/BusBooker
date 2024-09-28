import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TicketDetails = () => {
  const { state } = useLocation();
  const { booking } = state; // Access the booking details passed from Schedules page
  const navigate = useNavigate(); // Hook for navigation

  console.log(booking)

  const handleLogout = async () => {
    try {
      const url = 'http://localhost:5000/api/auth/user/logout';
      const response = await axios.post(url, { withCredentials: true });

      if (response.status === 200) {
        console.log(response.data.message); // Assuming the response has a message property
        navigate('/login');
      } else {
        console.error('Logout failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleRedirectHome = () => {
    navigate('/dashboard'); // Redirect to /dashboard when the button is clicked
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-6 bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-8 text-3xl font-bold text-center text-indigo-700">Ticket Details</h1>
        
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-indigo-600">Booking Summary</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-600">Operator:</p>
              <p className="text-lg font-semibold text-gray-800">{booking.schedule.bus.operator}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-600">Bus Number:</p>
              <p className="text-lg font-semibold text-gray-800">{booking.schedule.bus.busNumber}</p>
            </div>

            <div className="flex items-center justify-between">
        <p className="text-lg font-medium text-gray-600">Departure Time:</p>
        <p className="text-lg font-semibold text-gray-800">
            {new Date(booking.schedule.departureTime).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            })}
        </p>
        </div>

    <div className="flex items-center justify-between">
    <p className="text-lg font-medium text-gray-600">Arrival Time:</p>
    <p className="text-lg font-semibold text-gray-800">
        {new Date(booking.schedule.arrivalTime).toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        })}
    </p>
    </div>


            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-600">Seats Booked:</p>
              <p className="text-lg font-semibold text-gray-800">{booking.seatsBooked}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-600">Total Price:</p>
              <p className="text-lg font-semibold text-gray-800">₹{booking.totalPrice}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-600">Booking Status:</p>
              <p className={`text-lg font-semibold ${booking.bookingStatus === 'confirmed' ? 'text-green-600' : 'text-red-600'}`}>
                {booking.bookingStatus}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4 text-center">
          <button className="w-full px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
            Print Ticket
          </button>

          <button 
            className="w-full px-6 py-3 text-lg font-semibold text-indigo-600 bg-white border border-indigo-600 rounded-lg hover:bg-indigo-100" 
            onClick={handleRedirectHome}>
            Redirect to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
