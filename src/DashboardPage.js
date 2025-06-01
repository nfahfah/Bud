import React from 'react';
import { Link } from 'react-router-dom';

function DashboardPage() {
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>Dashboard</h2>
            <p>Welcome to your dashboard!</p>
            <p style={{ marginTop: '20px' }}>
                <Link to="/add-buddy">Add a Buddy</Link>
            </p>
        </div>

    );

}

export default DashboardPage;