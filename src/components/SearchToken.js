import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './config';

export default function RugChecker() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!input) return;
    setLoading(true);
    setResult(null);
    setError('');
    try {
      const res = await axios.get(`${BASE_URL}/api/rugcheck/${input}`);
      console.log(res.data);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const formatNum = (num) => {
    if (num == null) return 'N/A';
    if (num > 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num > 1e6) return (num / 1e6).toFixed(2) + 'M';
    return Number(num).toLocaleString();
  };

  const getRiskColor = (risk) => {
    if (!risk) return 'white';
    if (risk.includes('HIGH')) return 'red';
    if (risk.includes('SAFE') || risk.includes('LOW')) return 'lime';
    return 'orange';
  };

  return (
    <div style={{
      backgroundColor: '#471396',
      padding: '20px',
      borderRadius: '8px',
      color: 'white',
      maxWidth: '600px',
      margin: 'auto',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }}>
      <h2>Rugpull Cehcker</h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter token mint address"
        style={{
          width: '95%',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: 'none'
        }}
      />
      <button
        onClick={handleCheck}
        style={{
          padding: '10px 20px',
          backgroundColor: '#090040',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '15px'
        }}
      >
        Check Token
      </button>

      {loading && <p>Checking token...</p>}
      {error && <p style={{ color: 'salmon' }}>❌ {error}</p>}

      {result && (
        <div style={{ borderTop: '1px solid white', paddingTop: '15px' }}>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Symbol:</strong> {result.symbol}</p>
          <p><strong>Circulating Supply:</strong> {formatNum(result.circSupply)}</p>
          <p><strong>Total Supply:</strong> {formatNum(result.totalSupply)}</p>
          <p><strong>liquidity:</strong> ${formatNum(result.liquidity)}</p>
          <p><strong>Market Cap:</strong> ${formatNum(result.mcap)}</p>
          <p><strong>FDV:</strong> ${formatNum(result.fdv)}</p>
          <p><strong>Risk Prediction:</strong> <span style={{ color: getRiskColor(result.risk) }}>{result.risk}</span></p>
        </div>
      )}
    </div>
  );
}
