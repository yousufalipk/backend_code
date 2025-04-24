import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ user, fetchUsers }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });

  const apiUrl = import.meta.env.VITE_APP_URL;

  // If editing an existing user, populate the form with their data
  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, age: user.age });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await axios.put(`${apiUrl}/update/${user._id}`, formData);
    } else {
      await axios.post(`${apiUrl}/create`, formData);
    }
    setFormData({ name: '', email: '', age: '' }); // Clear form
    fetchUsers(); // Refresh user list
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <input
          name="age"
          placeholder="Age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
      >
        {user ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};
export default UserForm;
