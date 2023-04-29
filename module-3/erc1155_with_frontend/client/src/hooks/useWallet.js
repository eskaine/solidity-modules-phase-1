import { useState, useEffect } from "react";
import { ethers } from 'ethers';

export const useWallet = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [account, setAccount] = useState(null);

    async function getAccount() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const [address] = await provider.send("eth_requestAccounts", []);
            setAccount(address)
        }
    }

    async function connectMetamask() {
        await getAccount();

        if (!window.ethereum) {
            setErrorMessage("Please install Metamask!");
        }
    }

    useEffect(() => {
        getAccount();
    }, []);

    return {account, connectMetamask};
};

