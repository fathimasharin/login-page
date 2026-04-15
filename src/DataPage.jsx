import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, RefreshCw, Database, Search } from 'lucide-react';

const DataPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setTimeout(() => setLoading(false), 800); // Small delay for visual effect
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '700' }}>Data Repository</h2>
          <p style={{ color: 'var(--text-muted)' }}>Real-time repository of user dummy data</p>
        </div>
        <button className="btn-primary" onClick={handleLogout} style={{ width: 'auto', padding: '0.625rem 1.25rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search by name or language..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '40px' }}
          />
        </div>
        <button className="btn-primary" onClick={fetchData} style={{ width: 'auto', padding: '0.625rem 1.25rem' }}>
          <RefreshCw size={18} className={loading ? 'spin' : ''} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="data-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Language</th>
                <th>Version</th>
                <th>Bio Snippet</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id || index}>
                  <td style={{ color: 'var(--primary)', fontWeight: '500', fontSize: '0.75rem' }}>{item.id}</td>
                  <td style={{ fontWeight: '600' }}>{item.name}</td>
                  <td>
                    <span style={{ padding: '0.25rem 0.625rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', borderRadius: '999px', fontSize: '0.75rem' }}>
                      {item.language}
                    </span>
                  </td>
                  <td>{item.version}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.bio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Database size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>No results found for "{searchTerm}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataPage;
