import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { set } from 'mongoose';

const BusRoutes = ({ username }) => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState({
    source: '',
    destination: '',
    travelTime: 0,
  });
  const [cities, setCities] = useState([]);
  const [buses,setBuses]=useState([]);

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

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const url = 'http://localhost:5000/api/buses/fetchbuses';
        const res = await axios.get(url, { withCredentials: true });
        if (res.status === 200) {
          setBuses(res.data);
          console.log(res.data);
        }
      } catch (error) {
        console.log("Error fetching cities", error);
      }
    };

    fetchBuses();
  }, []);
  
  const fetchRoutes = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/schedule/fetchall', { withCredentials: true });
      setRoutes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  // Fetch Routes from API
  useEffect(() => {
    fetchRoutes();
  }, []);

  
    const [formData, setFormData] = useState({
      busnumber: '',
      source: '',
      destination: '',
      departure: '',
      arrival: '',
      cost: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/schedule/add', formData,{withCredentials:true});
        setMessage(response.data.message);
        setError(''); // Clear error if successful
      } catch (err) {
        setError(err.response?.data?.error || 'Error adding schedule');
        setMessage(''); // Clear message if error occurs
      }
    };




  const handleLogout = () => {
    console.log('Logout logic here');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg ms-3 sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/admin-dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/buses"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Buses</span>
              </a>
            </li>
            <li>
              <a
                href="/routes"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8c0-1.784-.735-3.396-1.982-4.614Zm-4.282-.006A6.697 6.697 0 0 0 12.31 6H9.69a6.7 6.7 0 0 0-.826-2.383A4.68 4.68 0 0 1 10 4c1.42 0 2.73-.62 3.677-1.646l.082.04c-.012.074-.036.143-.036.223 0 .557.063 1.096.177 1.64a6.748 6.748 0 0 1-.764-.64Z" />
                </svg>
                <span className="ms-3">Routes</span>
              </a>
            </li>
           
            <li>
                <a href="schedules" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Schedules</span>
                </a>
            </li>
            <li>
                <a href="prices" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Prices</span>
                </a>
            </li>
            <li>
            <button onClick={handleLogout} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
               <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">logout</span>
               
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:ml-64">
        <header className="bg-white shadow">
          <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-indigo-600">Bus Schedules Management</h1>
            
          </div>
        </header>

        {/* Routes Table */}
        {/* <div className="my-4 overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Source</th>
                <th className="px-4 py-2 border">Destination</th>
                <th className="px-4 py-2 border">Travel Time (hrs)</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route, index) => (
                <tr key={index} className="bg-white border">
                  <td className="px-4 py-2 border">{route.source}</td>
                  <td className="px-4 py-2 border">{route.destination}</td>
                  <td className="px-4 py-2 border">{route.travelTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}

        {/* Add Route Form */}
        <div className="container p-6 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Schedule a NewBus</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Bus Number</label>
          <select
            name="busnumber"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
            value={formData.busnumber}
            onChange={handleChange}
          >
            <option value="" disabled>Select a bus</option>
            {buses.map(bus => (
              <option key={bus._id} value={bus.busNumber}>
                {bus.busNumber} {/* Display the busNumber property */}
              </option>
            ))}
        </select>

        </div>
        <div>
          <label className="block text-sm font-medium">Source</label>
          <select
            name='source'
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                value={formData.source}
                onChange={handleChange}
              >
                <option value="" disabled>Select a city</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Destination</label>
          <select
          name="destination" // Add the name attribute to specify which form field this represents
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          value={formData.destination}
          onChange={handleChange} // handleChange will now capture both name and value
        >
          <option value="" disabled>Select a city</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
      </select>

        </div>
        <div>
          <label className="block text-sm font-medium">Departure Time</label>
          <input
            type="datetime-local"
            name="departure"
            value={formData.departure}
            onChange={handleChange}
            required
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Arrival Time</label>
          <input
            type="datetime-local"
            name="arrival"
            value={formData.arrival}
            onChange={handleChange}
            required
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Seat Cost</label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            required
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Add Schedule
        </button>
      </form>

      {message && <p className="mt-4 text-green-500">{message}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>

        
      </div>
    </div>
  );
};

export default BusRoutes;
