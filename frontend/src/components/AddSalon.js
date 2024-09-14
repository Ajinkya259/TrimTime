import React, { useState } from 'react';
import axios from 'axios';

const AddSalon = () => {
  const [formData, setFormData] = useState({
    salonName: '',
    ownerName: '',
    mobileNumber: '',
    address: '',
    salonImage: null,
  });

  const [availableServices] = useState([
    'Haircut',
    'Shave',
    'Beard Trim',
    'Hair Color',
    'Facial',
    'Manicure',
    'Pedicure',
    'Waxing',
    'Massage',
    'Scalp Treatment',
    'Bridal Makeup',
    'Regular Makeup',
    'Nail Art',
    'Hair Treatment',
    'Hair Styling',
  ]);

  const [selectedServices, setSelectedServices] = useState([]);
  const [priceInput, setPriceInput] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'salonImage') {
      setFormData({ ...formData, salonImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleServiceSelection = (serviceName, price) => {
    // Create a service object and add it to an array
    const newService = { serviceName, price };
    const updatedServices = [...formData.services, newService];

    setFormData({
        ...formData,
        services: JSON.stringify(updatedServices), // Send as a JSON string
    });
};

  const handleServiceSelect = (e) => {
    setSelectedService(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceInput(e.target.value);
  };

  const addService = () => {
    if (selectedService && priceInput) {
      setSelectedServices([...selectedServices, { name: selectedService, price: priceInput }]);
      setSelectedService('');
      setPriceInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('salonName', formData.salonName);
    form.append('ownerName', formData.ownerName);
    form.append('mobileNumber', formData.mobileNumber);
    form.append('services', JSON.stringify(selectedServices)); // Convert to string
    form.append('address', formData.address);
    form.append('salonImage', formData.salonImage);

    try {
        const response = await axios.post('/salon/add', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        alert(response.data.message || 'Salon registered successfully!');
    } catch (error) {
        console.error('Error registering salon:', error.response ? error.response.data : error);
        alert('Failed to register salon: ' + (error.response ? error.response.data.error : 'Unknown error.'));
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="salonName" 
        value={formData.salonName} 
        onChange={handleChange} 
        placeholder="Salon Name" 
        required 
      />
      <input 
        type="text" 
        name="ownerName" 
        value={formData.ownerName} 
        onChange={handleChange} 
        placeholder="Owner Name" 
        required 
      />
      <input 
        type="text" 
        name="mobileNumber" 
        value={formData.mobileNumber} 
        onChange={handleChange} 
        placeholder="Mobile Number" 
        required 
      />

      <h4>Select Services:</h4>
      <select value={selectedService} onChange={handleServiceSelect}>
        <option value="">Select a service</option>
        {availableServices.map((service, index) => (
          <option key={index} value={service}>{service}</option>
        ))}
      </select>
      <input 
        type="text" 
        value={priceInput} 
        onChange={handlePriceChange} 
        placeholder="Enter Price" 
      />
      <button type="button" onClick={addService}>Add Service</button>

      <h4>Selected Services:</h4>
      <ul>
        {selectedServices.map((service, index) => (
          <li key={index}>
            {service.name} - ₹{service.price}
          </li>
        ))}
      </ul>

      <input 
        type="text" 
        name="address" 
        value={formData.address} 
        onChange={handleChange} 
        placeholder="Address" 
        required 
      />
      <input 
        type="file" 
        name="salonImage" 
        accept="image/*" 
        onChange={handleChange} 
        required 
      />
      <button type="submit">Register Salon</button>
    </form>
  );
};

export default AddSalon;
