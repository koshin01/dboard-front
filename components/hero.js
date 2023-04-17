import { useState, useEffect } from 'react'

import AccountContext from '@/contexts/accountContext'
import ApprovalStateContext from '@/contexts/approvalStateContext'

import ConnectButton from '@/components/connectButton.js'
import InputField from '@/components/inputField.js'
import Board from '@/components/board.js'

export default function Hero() {

    const [account, setAccount] = useState("");

    const [approvalState, setApprovalState] = useState(false);

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

    return (
        <div className="flex flex-col mt-10 space-y-4">
            <AccountContext.Provider value={{ account, setAccount }}>
                <ConnectButton />
                <ApprovalStateContext.Provider value={{ approvalState, setApprovalState }}>
                    <InputField />
                    <Board />
                </ApprovalStateContext.Provider>
            </AccountContext.Provider>
        </div>
    )
}