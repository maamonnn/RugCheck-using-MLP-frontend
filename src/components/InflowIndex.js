import React, { useEffect, useState } from 'react';
import axios from 'axios';

function formatTVL(value) {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  return `$${value?.toFixed(2)}`;
}

export default function SolanaInflow() {
  const [allProtocols, setAllProtocols] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchInflow = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/solana-inflow');
        setAllProtocols(res.data);
      } catch (err) {
        console.error('Failed to fetch inflow data:', err.message);
      }
    };

    fetchInflow();
  }, []);

  const displayedProtocols = allProtocols.slice(0, visibleCount);

  return (
    <div style={{
      backgroundColor: '#471396',
      padding: '20px',
      color: 'white',
      maxWidth: '900px',
      margin: 'auto',
      borderRadius: '8px'
    }}>
      <h2 style={{ marginBottom: '15px' }}>Solana Protocol Inflows</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid white' }}>
            <th align="left">Protocol</th>
            <th>TVL</th>
            <th>1d Change</th>
            <th>7d Change</th>
          </tr>
        </thead>
        <tbody>
          {displayedProtocols.map((p, i) => (
            <tr key={i} style={{ borderBottom: '1px solid white', color: 'white' }}>
              <td>
                <a href={p.url} target="_blank" rel="noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                  {p.name}
                </a>
              </td>
              <td>{p.tvl != null ? formatTVL(p.tvl) : 'N/A'}</td>
              <td style={{ color: p.change1d >= 0 ? 'lime' : 'red' }}>
                {p.change1d != null ? `${p.change1d.toFixed(2)}%` : 'N/A'}
              </td>
              <td style={{ color: p.change7d >= 0 ? 'lime' : 'red' }}>
                {p.change7d != null ? `${p.change7d.toFixed(2)}%` : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {visibleCount < allProtocols.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => setVisibleCount((prev) => prev + 5)}
            style={{
              backgroundColor: '#090040',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
