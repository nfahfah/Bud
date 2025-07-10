import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import AccountSettings from './AccountSettings';
import AddBuddy from './AddBuddy';
import ResourcesView from './ResourcesView';
import ResourcesSharing from './ResourcesSharing';
import TaskList from './TaskList';
import Dashboard from './DashboardPage'; // ✅ matches with usage below

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ fixed */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/add-buddy" element={<AddBuddy />} />
        <Route path="/resources/view" element={<ResourcesView />} />
        <Route path="/resources/share" element={<ResourcesSharing />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </Router>
  );
}

export default App;



