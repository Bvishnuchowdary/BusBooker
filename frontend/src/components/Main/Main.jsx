import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBus, FaPlane, FaHotel, FaTrain, FaCar, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { MdHolidayVillage } from 'react-icons/md';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center h-screen text-center text-white bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute inset-0 bg-center bg-cover opacity-20" style={{ backgroundImage: `url('/images/hero-bg.jpg')` }}></div>

        <h1 className="z-10 text-6xl font-extrabold tracking-wide">
          Welcome to <span className="text-yellow-300">BusBooker</span>
        </h1>
        <p className="z-10 mt-4 text-2xl font-light">Your one-stop solution for booking buses, trains, and more!</p>
        
        {/* Animated Scrolling Text */}
        <div className="z-10 mt-8">
          <p className="text-lg font-medium animate-bounce">Fast • Reliable • Affordable</p>
        </div>

        {/* Search Bar Section */}
       

        {/* Action Buttons */}
        <div className="z-10 flex justify-center mt-8 space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 font-semibold text-blue-600 transition-transform transform bg-white rounded-lg shadow-md hover:scale-105 hover:bg-gray-100"
          >
            <FaSignInAlt className="inline mr-2" /> Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-3 font-semibold text-white transition-transform transform bg-blue-800 rounded-lg shadow-md hover:scale-105 hover:bg-blue-900"
          >
            <FaUserPlus className="inline mr-2" /> Sign Up
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-16 mx-auto ">
        <h2 className="mb-12 text-4xl font-bold text-center text-gray-800">Explore Our Services</h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            { icon: FaBus, title: 'Bus Booking', description: 'Book buses to your destination easily and quickly.', color: 'text-blue-600' },
            { icon: FaPlane, title: 'Flight Booking', description: 'Get the best deals on flights worldwide.', color: 'text-green-600' },
            { icon: FaHotel, title: 'Hotel Booking', description: 'Find affordable stays and luxurious getaways.', color: 'text-red-600' },
            { icon: MdHolidayVillage, title: 'Holiday Packages', description: 'Customized holiday packages to suit your needs.', color: 'text-purple-600' },
            { icon: FaTrain, title: 'Train Booking', description: 'Seamless train booking at your fingertips.', color: 'text-yellow-600' },
            { icon: FaCar, title: 'Car Rentals', description: 'Rent cars for a smooth and comfortable ride.', color: 'text-pink-600' }
          ].map((service, idx) => (
            <div key={idx} className="p-6 text-center transition-shadow bg-white rounded-lg shadow-md hover:bg-gray-50 hover:shadow-lg">
              <service.icon className={`mx-auto mb-4 text-5xl ${service.color}`} />
              <h3 className="text-2xl font-semibold text-gray-800">{service.title}</h3>
              <p className="mt-2 text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 text-center text-white bg-gradient-to-r from-indigo-500 to-purple-600">
        <h2 className="text-4xl font-bold">Ready to get started?</h2>
        <p className="mt-4 text-lg">Sign up today and start booking your trips hassle-free!</p>
        <button
          onClick={() => navigate('/signup')}
          className="px-8 py-4 mt-8 font-semibold text-indigo-600 transition-transform transform bg-white rounded-full shadow-lg hover:bg-gray-200 hover:scale-105"
        >
          Get Started
        </button>
      </div>

      {/* Footer */}
      <footer className="py-12 text-gray-400 bg-gray-900">
        <div className="container mx-auto text-center">
          <p>© 2024 BusBooker. All rights reserved.</p>
          <div className="mt-6 space-x-8">
            <a href="/faq" className="transition-colors hover:text-white">FAQ</a>
            <a href="/contact" className="transition-colors hover:text-white">Contact Us</a>
            <a href="/terms" className="transition-colors hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
