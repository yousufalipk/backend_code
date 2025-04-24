import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const apiUrl = import.meta.env.VITE_APP_URL;

  const fetchUsers = async () => {
    const res = await axios.get(`${apiUrl}/list`);
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`${apiUrl}/delete/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Users List</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">Age: {user.age}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingUser(user)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(user._id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <UserForm user={editingUser} fetchUsers={fetchUsers} />
    </div>
  );
};

export default UserList;
