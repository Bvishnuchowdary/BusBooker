import React from 'react';

const SeatSelection = ({ numSeats, setNumSeats, availableSeats }) => {
  const handleSeatChange = (e) => {
    setNumSeats(e.target.value);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
      <h2 className="mb-2 text-lg font-semibold text-gray-800">Select Number of Seats</h2>
      <div className="flex items-center space-x-4">
        <label htmlFor="seats" className="font-medium text-gray-700">Seats:</label>
        <select
          id="seats"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm form-select focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={numSeats}
          onChange={handleSeatChange}
        >
          {[...Array(availableSeats).keys()].map((seat) => (
            <option key={seat + 1} value={seat + 1}>
              {seat + 1}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-2 text-sm text-gray-500">You have selected {numSeats} seat(s).</p>
    </div>
  );
};

export default SeatSelection;
