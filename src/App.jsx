import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (currentPage) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.freeapi.app/api/v1/public/randomusers?page=${currentPage}&limit=10`);
      const data = await response.json();
      
      // Artificial delay for smooth loading animation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUsers(data.data.data);
      setMeta({
        totalItems: data.data.totalItems,
        currentPageItems: data.data.currentPageItems,
        totalPages: data.data.totalPages,
        page: data.data.page,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const renderPagination = () => {
    if (!meta) return null;
    const { totalPages } = meta;
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, page + 2);
    
    if (page <= 2) endPage = Math.min(5, totalPages);
    if (page >= totalPages - 1) startPage = Math.max(1, totalPages - 4);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="pagination">
        <button className="page-btn nav-btn" disabled={page === 1} onClick={() => setPage(1)} title="Go to First Page">
          &laquo; FIRST
        </button>
        <button className="page-btn nav-btn" disabled={page === 1} onClick={() => setPage(page - 1)} title="Previous Page">
          &lsaquo; PREV
        </button>
        
        {startPage > 1 && <span className="page-dots">...</span>}
        
        {pages.map(p => (
          <button key={p} className={`page-btn ${p === page ? 'active' : ''}`} onClick={() => setPage(p)}>
            {p}
          </button>
        ))}
        
        {endPage < totalPages && <span className="page-dots">...</span>}
        
        <button className="page-btn nav-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)} title="Next Page">
          NEXT &rsaquo;
        </button>
        <button className="page-btn nav-btn" disabled={page === totalPages} onClick={() => setPage(totalPages)} title="Go to Last Page">
          LAST &raquo;
        </button>
      </div>
    );
  };

  return (
    <>
      <header className="page-header">
        <div className="header-glow"></div>
        <h1 className="header-title">Global Network Directory</h1>
        <p className="header-subtitle">Discover premium profiles from around the globe.</p>
        
        {!loading && meta && (
          <div className="stats-dashboard">
            <div className="stat-box">
              <span className="stat-value">{meta.totalItems}</span>
              <span className="stat-label">Total Profiles</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{meta.currentPageItems}</span>
              <span className="stat-label">In this set</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{meta.page} / {meta.totalPages}</span>
              <span className="stat-label">Page Info</span>
            </div>
          </div>
        )}
      </header>

      <div className="container">
        {loading ? (
          <div className="loader">Connecting to global network...</div>
        ) : (
          <>
            <div className="top-pagination-wrapper">
              {renderPagination()}
            </div>

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

            <div className="bottom-pagination-wrapper">
              {renderPagination()}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
