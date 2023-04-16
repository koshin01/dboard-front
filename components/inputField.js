import React, { useState } from "react";
import { ethers } from "ethers";

import abi from "@/utils/MessagePortal.json"

export default function InputField() {

    const [context, setContext] = useState("");

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    const sendMessage = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const messaagePortalContract = new ethers.Contract(
                    contractAddress,
                    abi.abi,
                    signer
                );
                const messageTxn = await messaagePortalContract.message(context, { gasLimit: 300000 });
                await messageTxn.wait();
            } else {
                alert("メッセージを送信するには、ウォレットが必要です。")
            }
        } catch (error) {
            alert("メッセージ送信中にエラーが発生しました。");
            console.log(error);
        }
    }

    return (
        <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50">
            <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="resize-none block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your message..."
            />
            <button onClick={sendMessage} className="inline-flex justify-center p-2 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100">
                <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            </button>
        </div>
    )
}