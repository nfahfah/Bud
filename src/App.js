import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import AuthPage from './AuthPage';
import { Link } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import AddBuddyPage from './AddBuddyPage';

function App() {
  return (
    <Router>
      {/* Navigation links for easy access to pages */}
      <nav style={{ textAlign: 'center', margin: '20px' }}>
        <Link to="/">Home</Link> | 
        <Link to="/login" style={{ marginLeft: '10px' }}>Login</Link> | 
        <Link to="/register" style={{ marginLeft: '10px' }}>Register</Link>
      </nav>

      {/* Define routes for the application */}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/add-buddy" element={<AddBuddyPage />} />
      </Routes>
    </Router>
  );
}
export default App;

