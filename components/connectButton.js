export default function ConnectButton({ state }) {
    return (
        <button className = "text-white bg-slate-950 rounded-lg px-5 py-2.5">
            {state}
        </button>
    )
}