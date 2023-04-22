import React, { useState, useEffect, useContext } from "react";

import ApprovalStateContext from "@/contexts/approvalStateContext";

import { ethers } from "ethers";

import abi from "@/utils/MessagePortal.json"

export default function Board() {

    const [formattedMessages, setFormattedMessages] = useState([])

    const [isBoolean, switchBoolean] = useState(false)

    const { approvalState, setApprovalState } = useContext(ApprovalStateContext)

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    const getCurrentMessages = async () => {
        try {
            const { ethereum } = window;
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const messaagePortalContract = new ethers.Contract(
                contractAddress,
                abi.abi,
                signer
            );
            const messages = await messaagePortalContract.getCurrentMessages();

            const formattedMessages = messages.map((message) => {
                return {
                    address: message.sender,
                    timestamp: unixTimeToFormattedData(message.timestamp),
                    context: message.context,
                }
            });
            setFormattedMessages(formattedMessages);
            switchBoolean(true);
        } catch {
            try {
                const Alchemy_URL = process.env.NEXT_PUBLIC_YOUR_ALCHEMY_API_URL;
                const provider = new ethers.providers.JsonRpcProvider(Alchemy_URL);
                const messaagePortalContract = new ethers.Contract(
                    contractAddress,
                    abi.abi,
                    provider
                );
                const messages = await messaagePortalContract.getCurrentMessages();
                const formattedMessages = messages.map((message) => {
                    return {
                        address: message.sender,
                        timestamp: unixTimeToFormattedData(message.timestamp),
                        context: message.context,
                    }
                });
                setFormattedMessages(formattedMessages);
                switchBoolean(true);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getCurrentMessages();
    },[])

    useEffect(() => {

        let messaagePortalContract;

        const onNewMessage = (sender, timestamp, context) => {
            setFormattedMessages((prevState) => [
                ...prevState,
                {
                    address: sender,
                    timestamp: unixTimeToFormattedData(timestamp),
                    context: context,
                }
            ])
            setApprovalState(false);
        }

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const messaagePortalContract = new ethers.Contract(
                contractAddress,
                abi.abi,
                signer
            );
            messaagePortalContract.on("NewMessage", onNewMessage)
        }

        return () => {
            if (messaagePortalContract) {
                messaagePortalContract.off("NewMessage", onNewMessage);
            }
        }
    }, [isBoolean]);

    const unixTimeToFormattedData = (unixTime) => {
        const date = new Date(unixTime * 1000);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formmattedHours = hours.toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");

        const formattedData = `${year}/${month}/${day} ${formmattedHours}:${formattedMinutes}`;

        return formattedData;
    }

    return (
        <>
            {approvalState && (
                <button disabled type="button" class="h-20 text-gray-900 font-bold border border-gray-300 rounded-lg">
                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                    </svg>
                    トランザクション承認中...
                </button>
            )}
            {formattedMessages.slice(0).reverse().map((message, index) => {
                return (
                    <div key={index}>
                        <div>{message.address}</div>
                        <div className="text-gray-500">{message.timestamp.toString()}</div>
                        <div className="font-medium text-lg mt-1">{message.context}</div>
                    </div>
                );
            })}
        </>
    )
}