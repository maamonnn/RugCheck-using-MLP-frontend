import React from 'react';
import { WalletConnectionProvider } from './context/WalletConnectionProvider';
import ConnectWallet from './components/ConnectWallet';
import MainContent from './components/MainContent';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
    <nav>
      <WalletConnectionProvider>
        <ConnectWallet />
      </WalletConnectionProvider>
    </nav>
    <WalletConnectionProvider>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </WalletConnectionProvider>
    </>
);}

export default App;
