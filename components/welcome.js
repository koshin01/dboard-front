import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'

import Link from 'next/link'

export default function Welcome() {
    const [isOpen, setIsOpen] = useState(true);

    function closeModal() {
        setIsOpen(false)
    }

    const setDisplayPermission = () => {
        setIsOpen(false)
        localStorage.setItem("displayPermission","no")
    }

    function openModal() {
        setIsOpen(true)
    }

    useEffect(() => {
        if(localStorage.getItem("displayPermission") == "no"){
            setIsOpen(false)
        }
    }, []);

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        ようこそ👋
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            DBoard はWeb3 時代の掲示板です！
                                            <br />メッセージをブロックチェーンに投稿できます🤯
                                            <br />
                                            <br />だれにも管理されないWeb3 の世界を体験してみよう！
                                            <br />
                                            <br />
                                            <br />Designed by <Link href = "https://twitter.com/koshin2001" className="focus:outline-none underline">koshin</Link>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-slate-100 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-slate-50 focus:outline-none focus-visible:ring-slate-200"
                                            onClick={setDisplayPermission}
                                        >
                                            次回から表示しない
                                        </button>
                                    </div> 
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}