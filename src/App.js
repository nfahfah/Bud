import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import AuthPage from './AuthPage';
import DashboardPage from './DashboardPage';
import AddBuddyPage from './AddBuddyPage';
import logo from './Logo-new.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Logo */}
        <img src={logo} className="App-logo" alt="Logo" />

        {/* Define routes for the application */}
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/add-buddy" element={<AddBuddyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

