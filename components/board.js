import React, {useState, useEffect } from "react";

import abi from "@/utils/MessagePortal.json"

export default function Board() {

    const [formattedMessages, setFormattedMessages] = useState("")

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    const getCurrentMessages = async () => {
        const {ethereum} = window;

        try{
            if(ethereum){
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
                        timestamp: new Date(message.timestamp * 1000),
                        message: message.context,
                    }
                });
                setFormattedMessages(formattedMessages);
            }
        }catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            {formattedMessages.slice(0).reverse().map((message, index) => {
                return (
                    <div key = {index}>
                        <div> from: {message.address}</div>
                        <div> at: {message.timestamp.toString()}</div>
                        <div>{message.context}</div>
                    </div>
                );
            })}
        </>
    )
}