import React, { useState, useEffect, useContext } from "react";

import AccountContext from "@/contexts/accountContext";
import IsOpenContext from "@/contexts/isOpenContext";

import CustomDialog from "@/components/customDialog";

export default function ConnectButton() {

    const { account, setAccount } = useContext(AccountContext);

    const { isOpen, setIsOpen } = useContext(IsOpenContext);

    const [dialogContext, setDialogContext] = useState("");

    const pleaseGetWallet = { title: "Wallet が見つからない🥺", paragraph: "MetaMask などのWallet をインストールしてください！" }

    const errorDuringWalletConnection = { title: "Wallet 接続中にエラーが起こりました😢", paragraph: "もう一度、Connect Wallet ボタンを押してください！" }

    const setDialog = (context) => {
        setDialogContext(context);
        setIsOpen(true);
    }

    const init = async () => {
        try {
            const { ethereum } = window;
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length != 0) {
                const account = accounts[0];
                setAccount(account);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        init();
    }, []);

    const connectWallet = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                setDialog(pleaseGetWallet);
                return
            };
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccount(accounts[0]);
        } catch (error) {
            setDialog(errorDuringWalletConnection);
            console.log(error)
        }
    }

    return (
        <>
            {!account && (
                <button onClick={connectWallet} className="text-white bg-slate-950 hover:bg-slate-900 rounded-lg py-2.5">
                    Connect Wallet
                </button>
            )}
            {account && (
                <button onClick={connectWallet} className="text-white bg-slate-950 rounded-lg py-2.5">
                    Connected !
                </button>
            )}
            {!dialogContext == "" && (
                <CustomDialog {...dialogContext} />
            )}
        </>
    )
}