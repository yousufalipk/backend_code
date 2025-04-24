import React from 'react';
import UserList from './components/UserList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          User Management
        </h1>
        <UserList />
      </div>
    </div>
  );
}

export default App;
