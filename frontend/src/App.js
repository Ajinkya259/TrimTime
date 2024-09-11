import React from 'react';
import './styles.css';
import Login from './components/Login';
import Signup from './components/SignUp';
import Error from './components/Error';
import Profile from './components/Profile'; // Import profile page
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} /> {/* Profile route */}
        <Route path="*" element={<Error />} /> {/* Catch-all route for errors */}
      </Routes>
    </div>
  );
}

export default App;
