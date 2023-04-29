import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, COLLECTION_LENGTH } from "@/utils/constants";
import { gameItemAbi } from "@/abis/gameItemAbi";

export const useEthers = (account) => {
  const newArr = new Array().fill(COLLECTION_LENGTH);
  const [playerData, setPlayerData] = useState(newArr);
  const [contractAddress] = useState(CONTRACT_ADDRESS);

  function getContract() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      return new ethers.Contract(contractAddress, gameItemAbi, signer);
    }
  }

  async function fetchPlayerData() {
    try {
      const contract = getContract();
      const addresses = new Array(COLLECTION_LENGTH).fill(account);
      const items = await contract.getPlayerAllItems(addresses);
      setPlayerData(items.map((item) => Number(item)));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (account) {
      fetchPlayerData();
    }
  }, [account]);

  return { playerData };
};
