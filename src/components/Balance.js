import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

function GetBalance(){
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const getBalance = async () => {
            if (publicKey) {
                const lamports = await connection.getBalance(publicKey);
                setBalance(lamports / 1e9);
            }
        };
        getBalance();
    }, [publicKey, connection]);
    return (
        <>
        {balance !== null
            ? `Balance: ${balance.toFixed(3)} SOL`
            : 'Connect wallet to view balance'}
        </>
    );
}

export default GetBalance;