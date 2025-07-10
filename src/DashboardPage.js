import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#b9b48d', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '20px', fontSize: '3rem', color: '#3c2c2c', fontFamily: 'Impact, sans-serif' }}>
        Welcome to BUD!
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        
        {/* Left Sidebar */}
        <div style={{
          width: '250px',
          backgroundColor: '#f4ecd8',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          <button onClick={() => navigate('/add-buddy')}>👥 Add Study Buddy</button>
          <button onClick={() => navigate('/tasks')}>💻 Task List</button>
          <button onClick={() => navigate('/resources/view')}>📚 View Resources</button>
          <button onClick={() => navigate('/resources/share')}>📨 Share Resources</button>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '30px' }}>
          <div style={{
            backgroundColor: '#d6c7a1',
            padding: '20px',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            marginBottom: '20px'
          }}>
            Daily Dashboard
          </div>

          <div>
            <p><strong> Notifications:</strong> (e.g., “Your buddy shared &lt;filename&gt; with you!”)</p>
            <p><strong> Top 3 Most Urgent Tasks:</strong> (with due dates)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;


