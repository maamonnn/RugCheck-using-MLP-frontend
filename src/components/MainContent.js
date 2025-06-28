import './Components.css';
import GetBalance from './Balance';
import MarketSummary from './MarketSummary';
import SolanaInflow from './InflowIndex';
import TradeNavigate from './TradeNavigate';
import RugChecker from './SearchToken';

function MainContent() {
  return (
    <div className='body'>
      <div className='left-content'>
        <div className='balance'>
            <GetBalance />
        </div>
        <div className='indikator'>
            <MarketSummary />
        </div>
      </div>
      <div className='mid-content'>
        <RugChecker />
      </div>
      <div className='right-content'>
        <SolanaInflow />
        <TradeNavigate />
      </div>
    </div>
  );
}

export default MainContent;
