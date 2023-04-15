import React, {useContext} from "react";

import AccountContext from "@/contexts/accountContext";

export default function ConnectButton() {

    const {account, setAccount} = useContext(AccountContext);

    const connectWallet = async () => {
        try{
            const {ethereum} = window;
            if(!ethereum) {
                alert("MetaMask などのウォレットが必要です。")
                return
            };
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccount(accounts[0]);
        }catch(error){
            alert("Wallet 接続中にエラーが起こりました")
            console.log(error)
        }
    }

    return (
        <>
            {!account && (
                <button onClick = {connectWallet} className = "text-white bg-slate-950 rounded-lg px-5 py-2.5">
                    Connect Wallet
                </button>
            )}
            {account && (
                <button onClick = {connectWallet} className = "text-white bg-slate-950 rounded-lg px-5 py-2.5">
                    Connected !
                </button>
            )}            
        </>
    )
}