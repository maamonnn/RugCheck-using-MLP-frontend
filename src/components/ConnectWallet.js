import React, { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

function PriceDisplay() {
  const [priceSOL, setPriceSOL] = useState(null);
  const [priceBTC, setPriceBTC] = useState(null);

    useEffect(() => {
    const ws = new WebSocket('ws://localhost:5001');
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if(data.symbol == 'BTC'){
            setPriceBTC(data.price);
        }else if(data.symbol == 'SOL'){
            setPriceSOL(data.price);
        }
    };
    return () => ws.close();
    }, []);

  return (
    <div>
        <ul style={{ listStyle: 'none', padding: '0px', margin: '0px', display: 'flex' }}>
            <li style={{marginRight: '15px',marginTop: '15px'}}>BTC: {priceBTC ? `${priceBTC} USDT` : 'Loading...'}</li>
            <li style={{marginLeft: '15px', marginTop: '15px'}}>SOL: {priceSOL ? `${priceSOL} USDT` : 'Loading...'}</li>
        </ul>
    </div>
  );
}

export default function ConnectWallet() {
  return (
    <div style={{ backgroundColor: '#090040', color: 'white', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <PriceDisplay />
        <WalletMultiButton />
    </div>
  );
}
