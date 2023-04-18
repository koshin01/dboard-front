import { useState } from 'react'

import ApprovalStateContext from '@/contexts/approvalStateContext'

import ConnectButton from '@/components/connectButton.js'
import InputField from '@/components/inputField.js'
import Board from '@/components/board.js'

export default function Hero() {

    const [approvalState, setApprovalState] = useState(false);

    return (
        <div className="flex flex-col mt-10 space-y-4">
            <ConnectButton />
            <ApprovalStateContext.Provider value={{ approvalState, setApprovalState }}>
                <InputField />
                <Board />
            </ApprovalStateContext.Provider>
        </div>
    )
}