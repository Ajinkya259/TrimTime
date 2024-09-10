import React, { useState } from 'react';

const AddSalon = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [services, setServices] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salonDetails = {
      name,
      location,
      services,
    };

    // Call the function to send the request
    await addSalon(salonDetails);
  };

  const addSalon = async (salonDetails) => {
    try {
      const response = await fetch('http://localhost:5000/api/add-salon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(salonDetails),
      });

      const data = await response.text();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error adding salon:', error);
    }
  };

  return (
    <div>
      <h2>Add a Salon</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Salon Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Services (comma separated)"
          value={services}
          onChange={(e) => setServices(e.target.value)}
        />
        <button type="submit">Add Salon</button>
      </form>
    </div>
  );
};

export default AddSalon;
