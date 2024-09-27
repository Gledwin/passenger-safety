"use client"

import React, { useState } from 'react';
import { addPassengerToRide } from '@/services/addPassengerToRide'; // Import the addPassengerToRide function

const TaxiDapp = () => {
  const [rideId, setRideId] = useState('');
  const [driverAddress, setDriverAddress] = useState('');
  const [passengerLimit, setPassengerLimit] = useState('');
  const [fare, setFare] = useState('');
  const [rideDetails, setRideDetails] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [forImmediateStart, setForImmediateStart] = useState(false);
  const [passengerAddress, setPassengerAddress] = useState('');
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(false); // Optional loading state

  
  // Handle adding passenger to the ride
const handleAddPassenger = async () => {
  if (rideId && passengerAddress) {
    // Validate the passenger address format
    const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(passengerAddress);
    if (!isValidAddress) {
      console.error('Invalid passenger address');
      return;
    }

    setLoading(true); // Start loading
    const success = await addPassengerToRide(undefined, {
      _rideId: parseInt(rideId),
      _passenger: passengerAddress as `0x${string}`, // Type assertion
    });

    if (success) {
      console.log('Passenger successfully added to the ride on-chain!');
    } else {
      console.error('Failed to add passenger to the ride on-chain.');
    }
    setLoading(false); // Stop loading
  }
};


  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Cashless Taxi Safety DApp</h1>

      {/* Ride Management Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Ride Management (Driver Only)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Ride ID"
            value={rideId}
            onChange={(e) => setRideId(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Driver Address"
            value={driverAddress}
            onChange={(e) => setDriverAddress(e.target.value)}
          />
          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Passenger Limit"
            value={passengerLimit}
            onChange={(e) => setPassengerLimit(e.target.value)}
          />
          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Fare"
            value={fare}
            onChange={(e) => setFare(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Ride Details"
            value={rideDetails}
            onChange={(e) => setRideDetails(e.target.value)}
          />
          <input
            type="datetime-local"
            className="border p-2 rounded"
            placeholder="Departure Time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={forImmediateStart}
              onChange={(e) => setForImmediateStart(e.target.checked)}
            />
            <label className="ml-2">Immediate Start</label>
          </div>
         
        </div>
      </div>

      {/* Passenger Management Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Passenger Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Passenger Address"
            value={passengerAddress}
            onChange={(e) => setPassengerAddress(e.target.value)}
          />
          <button
            onClick={handleAddPassenger}
            className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Adding Passenger...' : 'Add Passenger'}
          </button>
        </div>

        {/* List of Passengers */}
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Passengers</h3>
          <ul className="list-disc ml-5">
            {passengers.map((passenger, index) => (
              <li key={index}>{passenger}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaxiDapp;
