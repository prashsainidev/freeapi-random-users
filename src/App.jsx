import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://api.freeapi.app/api/v1/public/randomusers')
      .then(response => response.json())
      .then(data => {
        console.log('API Data:', data);
        setUsers(data.data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <header className="page-header">
        <h1>Global Network Directory</h1>
        <div className="status-badge">
          <span className="pulse"></span>
          {users.length} Active Profiles Discovered
        </div>
      </header>

      <div className="container">
        <div className="card-grid">
          {users.map((user, index) => {
            return (
              <div className="premium-card" key={index}>
                <div className="card-header-bg">
                  <div className="badge-container">
                    <span className={`gender-badge ${user.gender}`}>{user.gender}</span>
                  </div>
                </div>

                <div className="profile-section">
                  <img src={user.picture.large} alt={user.name.first} className="profile-img" />
                  <h2>
                    {user.name.first} {user.name.last}
                  </h2>
                  <p className="username">@{user.login.username}</p>
                </div>

                <div className="details-section">
                  <div className="info-row">
                    <span className="icon">📧</span>
                    <span className="text">{user.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="icon">📱</span>
                    <span className="text">{user.cell}</span>
                  </div>
                  <div className="info-row">
                    <span className="icon">📍</span>
                    <span className="text">
                      {user.location.city}, {user.location.country}
                    </span>
                  </div>
                </div>

                <div className="card-footer">
                  <button
                    className="connect-btn"
                    onClick={() =>
                      alert(`Friend request sent to ${user.name.first} ${user.name.last}!`)
                    }
                  >
                    Connect
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
