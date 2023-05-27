import { useState} from 'react'

import ApprovalStateContext from '@/contexts/approvalStateContext'
import AccountContext from '@/contexts/accountContext'

import ConnectButton from '@/components/connectButton'
import InputField from '@/components/inputField'
import Board from '@/components/board'
import Welcome from '@/components/welcome'


export default function Hero({ alchmeyURL }) {

    const [account, setAccount] = useState("")

    const [approvalState, setApprovalState] = useState(false);

    return (
        <div className="flex flex-col mt-10 space-y-4 w-80 md:w-96">
            <AccountContext.Provider value={{ account, setAccount }}>
                <ConnectButton />
                <ApprovalStateContext.Provider value={{ approvalState, setApprovalState }}>
                    <InputField />
                    <Board alchmeyURL = { alchmeyURL }/>
                </ApprovalStateContext.Provider>
            </AccountContext.Provider>
            <Welcome />
        </div>
    )
}