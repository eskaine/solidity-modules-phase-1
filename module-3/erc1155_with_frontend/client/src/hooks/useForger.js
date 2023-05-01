import { useState, useEffect } from "react";
import {
  FORGER_ADDRESS,
  COLLECTION_ADDRESS,
  COLLECTION_LENGTH,
} from "@/utils/constants";
import { gameCollectionAbi } from "@/abis/gameCollectionAbi";
import { forgerAbi } from "@/abis/forgerAbi";
import { useWallet } from "./useWallet";

export const useForger = () => {
  const {account, getContract} = useWallet();
  const newArr = new Array(COLLECTION_LENGTH).fill(0);
  const [itemData, setItemData] = useState(newArr);

  async function fetchPlayerData() {
    try {
      const collectionContract = await getContract(
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
