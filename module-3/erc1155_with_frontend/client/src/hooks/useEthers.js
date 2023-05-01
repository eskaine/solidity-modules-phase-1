import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  FORGER_ADDRESS,
  COLLECTION_ADDRESS,
  COLLECTION_LENGTH,
} from "@/utils/constants";
import { gameCollectionAbi } from "@/abis/gameCollectionAbi";
import { forgerAbi } from "@/abis/forgerAbi";

export const useEthers = (account) => {
  const newArr = new Array().fill(COLLECTION_LENGTH);
  const [itemData, setItemData] = useState(newArr);

  function getContract(contractAddress, contractAbi) {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      return new ethers.Contract(contractAddress, contractAbi, signer);
    }
  }

  async function fetchPlayerData() {
    try {
      const collectionContract = getContract(
        COLLECTION_ADDRESS,
        gameCollectionAbi
      );
      const addresses = new Array(COLLECTION_LENGTH).fill(account);
      const items = await collectionContract.getPlayerAllItems(addresses);
      setItemData(items.map((item) => Number(item)));
    } catch (error) {
      console.error(error);
    }
  }

  async function forgeItem(id) {
    try {
      const forgerContract = getContract(FORGER_ADDRESS, forgerAbi);
      const tx = await forgerContract.forgeItem(id);
      await tx.wait();
      await fetchPlayerData();

      return true;
    } catch (error) {
      return false;
    }
  }

  async function burnItem(id) {
    try {
      const collectionContract = getContract(
        COLLECTION_ADDRESS,
        gameCollectionAbi
      );
      const tx = await collectionContract.burn(account, id, 1);
      await tx.wait();
      await fetchPlayerData();

      return true;
    } catch (error) {
      return false;
    }
  }

  async function tradeItem(id, tradeWithId) {
    try {
      const forgerContract = getContract(FORGER_ADDRESS, forgerAbi);
      const tx = await forgerContract.tradeItem(id, tradeWithId);
      await tx.wait();
      await fetchPlayerData();

      return true;
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    if (account) {
      fetchPlayerData();
    }
  }, [account]);

  return { itemData, forgeItem, burnItem, tradeItem };
};
