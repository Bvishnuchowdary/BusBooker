import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [cities, setCities] = useState([]);
  const [busSchedules, setBusSchedules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:5000/api/routes/fetchroute';
        const res = await axios.get(url, { withCredentials: true });
        if (res.status === 200) {
          setCities(res.data);
        }
      } catch (error) {
        console.log("Error fetching cities", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const url = 'http://localhost:5000/api/auth/user/logout';
      const response = await axios.post(url, { withCredentials: true });
      if (response.status === 200) {
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSearch = async () => {
    if (fromCity === toCity) {
      alert("Source and destination cannot be the same.");
      return;
    }
    try {
      const url = 'http://localhost:5000/api/schedule/fetch';
      const response = await axios.post(url, {
        source: fromCity,
        destination: toCity
      }, { withCredentials: true });

      if (response.status === 200) {
        setBusSchedules(response.data.schedules);
      } else {
        console.error('Unable to fetch schedules');
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const handleBookNow = (schedule) => {
    navigate('/schedule', { state: { schedule } });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="py-4 bg-blue-600 shadow-lg">
        <div className="container flex items-center justify-between px-4 mx-auto">
          <div className="text-3xl font-bold text-white">BusBooker</div>
          <nav className="space-x-6 text-white">
            <a href="#" className="hover:underline">Flights</a>
            <a href="#" className="hover:underline">Hotels</a>
            <a href="#" className="hover:underline">Buses</a>
            <a href="#" className="hover:underline">Cabs</a>
          </nav>
          <button onClick={handleLogout} className="px-4 py-2 text-blue-600 bg-white rounded-lg shadow hover:bg-blue-50">
            Logout
          </button>
        </div>
      </header>

      <div className="container px-4 mx-auto mt-8">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Search Bus Schedules</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="block mb-2 font-semibold text-gray-600">From</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
              >
                <option value="" disabled>Select a city</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-600">To</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
              >
                <option value="" disabled>Select a city</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-600">Depart</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" />
            </div>
          </div>
          <button onClick={handleSearch} className="w-full px-6 py-3 mt-6 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700">
            Search
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Available Buses</h2>
          <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
            {busSchedules.map((schedule) => (
              <div key={schedule._id} className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
                <h3 className="text-xl font-bold text-gray-800">{schedule.bus.operator}</h3>
                <p className="text-gray-600">Bus Number: {schedule.bus.busNumber}</p>
                <p className="text-gray-600">Type: {schedule.bus.type}</p>
                <p className="text-gray-600">From: {schedule.route.source} To: {schedule.route.destination}</p>
                <p className="text-gray-600">Departure: {new Date(schedule.departureTime).toLocaleString()}</p>
                <p className="text-gray-600">Arrival: {new Date(schedule.arrivalTime).toLocaleString()}</p>
                <p className="text-gray-600">Available Seats: {schedule.availableSeats}</p>
                <button
                  onClick={() => handleBookNow(schedule)}
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
