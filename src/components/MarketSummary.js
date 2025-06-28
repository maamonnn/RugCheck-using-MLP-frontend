import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './config';


function formatMC(value) {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value?.toFixed(2)}`;
}

export default function MarketSummary() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/market-summary`);
        setData(res.data);
      } catch (err) {
        console.error('Failed to load market summary:', err.message);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <p style={{ color: 'white' }}>Loading market summary...</p>;

  return (
    <div style={{
      backgroundColor: '#090040',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '600px',
      margin: 'auto',
      fontSize : '15px'
    }}>
      <h2>Market Summary</h2>
      <p><strong>Total Market Cap:</strong> {formatMC(data.totalMarketCapUSD)}</p>
      <p><strong>BTC Dominance:</strong> {data.btcDominance.toFixed(2)}%</p>
      <p><strong>SOL Market Cap Share:</strong> {data.solMarketCapPercent.toFixed(2)}%</p>
      <p><strong>Fear & Greed Index:</strong> {data.fearIndex} — {data.fearLevel}</p>
    </div>
  );
}
