import { useNavigate } from 'react-router-dom';
export default function TradeNavigate(){
    const navigate = useNavigate();

    const handleClick = () => {
        window.open('https://raydium.io/swap', '_blank');
    }
    return(
        <div style={{ backgroundColor: '#471396', padding: '20px', color: 'white', maxWidth: '900px', margin: '20px auto', borderRadius: '8px', textAlign: 'center' }}>
            <h2>Swap Token?</h2>
            <button onClick={handleClick} className='button-navigate'>Trade Now</button>
        </div>
    );
};