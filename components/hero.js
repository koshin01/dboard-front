import ConnectButton from '@/components/connectButton.js'
import InputField from '@/components/inputField.js'
import Board from '@/components/board.js'

export default function Hero() {
    return(
        <div className = "flex flex-col mt-10 space-y-4">
            <ConnectButton/>
            <InputField />
            <Board />
        </div>
    )
}