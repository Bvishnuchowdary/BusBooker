import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Schedules from './components/Schedules/Schedules.jsx';
import TicketDetails from './components/ticketdetails/TicketDetails.jsx';
import MainPage from './components/Main/Main.jsx';
import AdminDashboard from './components/Admin/Dashboard.jsx';
import AdminLogin from './components/Admin/Admin-login.jsx';
import Buses from './components/Admin/Buses.jsx';
import BusRoutes from './components/Admin/Routes.jsx';
import BusSchedules from './components/Admin/Schedules.jsx';

function App() {
  return (
    <div >
      <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/admin-login" element={<AdminLogin />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/dashboard" element={<Dashboard />} />
  
  {/* Admin Dashboard routes */}
  <Route path="/admin-dashboard" element={<AdminDashboard />}>
    
  </Route>
  <Route path="buses" element={<Buses/>} /> 
  <Route path="routes" element={<BusRoutes/>} /> 
  <Route path="schedules" element={<BusSchedules/>} /> 
  <Route path="/" element={<MainPage />} /> {/* Default route */}
  <Route path="/schedule" element={<Schedules />} />
  <Route path="/ticket-details" element={<TicketDetails />} />
      </Routes>
    </div>
  );
}

export default App;
