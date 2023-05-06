import React, { useState, useEffect, useContext } from "react";

import { MetaMaskWallet } from "@thirdweb-dev/wallets";

import AccountContext from "@/contexts/accountContext";
import IsOpenContext from "@/contexts/isOpenContext";

import CustomDialog from "@/components/customDialog";

export default function ConnectButton() {

    const { account, setAccount } = useContext(AccountContext);

    const { isOpen, setIsOpen } = useContext(IsOpenContext);

    const [dialogContext, setDialogContext] = useState("");

    const pleaseGetWallet = { title: "Wallet が見つからない🥺", paragraph: "MetaMask などのWallet をインストールしてください！" }

    const errorDuringWalletConnection = { title: "Wallet 接続中にエラーが起こりました😢", paragraph: "もう一度、Connect Wallet ボタンを押してください！" }

    const pleaseChangeChain = { title: "チェーンを切り替えて🙏", paragraph: "メッセージを送信するには、ネットワークをSeplia に切り替える必要があります！" }

    const setDialog = (context) => {
        setDialogContext(context);
        setIsOpen(true);
    }

    const init = async () => {
        try {
            const wallet = new MetaMaskWallet();

            const address = await wallet.autoConnect();

            const chainId = await wallet.getChainId();

            if (!(chainId == 11155111)) {
                setDialog(pleaseChangeChain);
                await wallet.switchChain(11155111);
                setIsOpen(false);
            }

            setAccount(address);

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
            const wallet = new MetaMaskWallet();

            const address = await wallet.connect();

            const chainId = await wallet.getChainId();
            if (!(chainId == 11155111)) {
                setDialog(pleaseChangeChain);
                await wallet.switchChain(11155111);
                setIsOpen(false);
            }

            setAccount(address);
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