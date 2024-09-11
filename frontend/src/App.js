import React from 'react';
import './styles.css';
import Login from './components/Login';
import Signup from './components/SignUp';
import Error from './components/Error';
import LandingPage from './components/LandingPage'; //landing page imported
import Profile from './components/Profile'; // Import profile page
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Set LandingPage as default */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
