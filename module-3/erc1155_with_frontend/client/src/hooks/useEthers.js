import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, COLLECTION_LENGTH } from "@/utils/constants";
import { gameItemAbi } from "@/abis/gameItemAbi";

export const useEthers = (account) => {
  const newArr = new Array().fill(COLLECTION_LENGTH);
  const [itemData, setItemData] = useState(newArr);
  const [contractAddress] = useState(CONTRACT_ADDRESS);

  function getContract() {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      return new ethers.Contract(contractAddress, gameItemAbi, signer);
    }
  }

  async function fetchPlayerData(contract) {
    try {
      const addresses = new Array(COLLECTION_LENGTH).fill(account);
      const items = await contract.getPlayerAllItems(addresses);
      setItemData(items.map((item) => Number(item)));
    } catch (error) {
      console.error(error);
    }
  }

  async function mintItem(id) {
    try {
        const contract = getContract();
        const tx = await contract.mintItem(id);
        await tx.wait();
        await fetchPlayerData(contract);

        return true;
      } catch (error) {
        return false;
      }
  }

  useEffect(() => {
    if (account) {
      fetchPlayerData(getContract());
    }
  }, [account]);

  return { itemData, mintItem };
};
