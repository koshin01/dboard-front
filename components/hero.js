import { useState } from 'react'

import ApprovalStateContext from '@/contexts/approvalStateContext'
import AccountContext from '@/contexts/accountContext'

import ConnectButton from '@/components/connectButton.js'
import InputField from '@/components/inputField.js'
import Board from '@/components/board.js'

export default function Hero() {

    const [account, setAccount] = useState("")

    const [approvalState, setApprovalState] = useState(false);

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