import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import AccountSettings from './AccountSettings'; // You will create this later
import AddBuddy from './AddBuddy'; // Existing page you mentioned
import ResourcesView from './ResourcesView'; // You will create this later
import ResourcesSharing from './ResourcesSharing'; // You will create this later
import TaskList from './TaskList'; // You will create this later


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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


