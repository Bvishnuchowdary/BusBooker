import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Schedules from './components/Schedules/Schedules.jsx';
import TicketDetails from './components/ticketdetails/TicketDetails.jsx';

function App() {
  return (
    <div >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
        <Route path="/schedule" element={<Schedules/>} />
        <Route path="/ticket-details" element={<TicketDetails />} />
      </Routes>
    </div>
  );
}

export default App;
