import { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import {
  MUMBAI_ID_HEX,
  POLYGON_API,
  POLYGON_MUMBAI_NETWORK,
  POLYGON_DECIMALS,
} from "@/utils/constants";

export const useWallet = () => {
  const { account, connect, status, chainId, addChain } = useMetaMask();
  const [balance, setBalance] = useState(0);

  function getContract(contractAddress, contractAbi) {
    if (account && chainId !== MUMBAI_ID_HEX) {
      switchNetwork();
    } else if (account && chainId === MUMBAI_ID_HEX) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      return new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
    }
  }

  async function getBalance() {
    if (status == "connected" && chainId === MUMBAI_ID_HEX) {
      const params = `?module=account&action=balance&address=${account}&apikey=${process.env.POLYGONSCAN_API_KEY}`;
      const { status, data } = await axios.get(POLYGON_API + params);
      if (status === 200) {
        const amount = Number(data.result / Math.pow(10, POLYGON_DECIMALS));
        setBalance(amount);
      }
    }
  }

  function switchNetwork() {
    addChain(POLYGON_MUMBAI_NETWORK);
  }

  function connectHandler() {
    connect();
  }

  useEffect(() => {
    switchNetwork();
  }, [chainId]);

  useEffect(() => {
    getBalance();
  }, [status, account]);

  return { account, status, balance, chainId, getContract, connectHandler };
};
