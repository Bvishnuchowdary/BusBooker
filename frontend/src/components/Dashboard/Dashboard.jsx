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
          console.log(res.data);
          setCities(res.data);
        }
      } catch (error) {
        console.log("error in fetching the cities", error);
      }
    };

    fetchData();
  }, []);

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

  const handleSearch = async () => {
    if (fromCity === toCity) {
      alert("Source and destination city cannot be the same");
      return;
    }
    console.log(fromCity);
    console.log(toCity);
    try {
      const url = 'http://localhost:5000/api/schedule/fetch';
      const response = await axios.post(url, {
        source: fromCity,
        destination: toCity
      }, { withCredentials: true });

      if (response.status === 200) {
        console.log(response.data.schedules);
        setBusSchedules(response.data.schedules);
      } else {
        console.error('Unable to fetch the bus schedules', response.status);
      }
    } catch (error) {
      console.error('Unable to fetch the bus schedules', error);
    }
  };

  const handleBookNow = (schedule) => {
    navigate('/schedule', { state: { schedule } }); // Passing bus schedule data to the new route
  };

  return (
    <div className="container p-4 mx-auto">
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

      <div className="p-4 bg-blue-100 rounded">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700">From</label>
            <select
              className="w-full p-2 border rounded"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            >
              <option value="" disabled>Select a city</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-gray-700">To</label>
            <select
              className="w-full p-2 border rounded"
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
            <label className="block text-gray-700">Depart</label>
            <input type="date" className="w-full p-2 border rounded" />
          </div>
        </div>
        <button onClick={handleSearch} className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded">Search</button>
      </div>

      <div className="flex mt-8">
        <aside className="w-1/4">
          <h2 className="font-bold">Filters</h2>
          <div className="mt-4">
            <label className="block text-gray-700">AC</label>
            <div className="mt-2 space-x-4">
              <button className="px-4 py-2 bg-white border rounded">AC</button>
              <button className="px-4 py-2 bg-white border rounded">Non AC</button>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Seat type</label>
            <div className="mt-2 space-x-4">
              <button className="px-4 py-2 bg-white border rounded">Sleeper</button>
              <button className="px-4 py-2 bg-white border rounded">Seater</button>
            </div>
          </div>
        </aside>

        <main className="flex-1 ml-8">
          <h2 className="font-bold">Available Buses</h2>
          <div className="mt-4">
            {busSchedules.map((schedule) => (
              <div key={schedule._id} className="p-4 mb-4 bg-white rounded shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{schedule.bus.operator}</h3>
                    <p>Bus Number: {schedule.bus.busNumber}</p>
                    <p>Type: {schedule.bus.type}</p>
                    <p>From: {schedule.route.source} To: {schedule.route.destination}</p>
                    <p>Departure: {new Date(schedule.departureTime).toLocaleString()}</p>
                    <p>Arrival: {new Date(schedule.arrivalTime).toLocaleString()}</p>
                    <p>Available Seats: {schedule.availableSeats}</p>
                    
                  </div>
                  <div>
                  
                    <button
                      onClick={() => handleBookNow(schedule)}
                      className="px-4 py-2 text-white bg-blue-600 rounded"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
