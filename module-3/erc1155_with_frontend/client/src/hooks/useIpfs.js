import { useState, useEffect } from "react";
import axios from "axios";
import { INFURA_API } from "@/utils/constants";

export const useIpfs = (collectionLength) => {
  const [collection, setCollection] = useState([]);

  async function fetchCollection(length) {
    const urls = [];

    for (let i = 0; i < length; i++) {
      urls.push(`${INFURA_API}${i}.json`);
    }

    try {
      const result = await axios.all(
        urls.map(async (url) => {
          const res = await axios.get(url);

          if ((res.status = 200)) {
            return res.data;
          }

          return {};
        })
      );
      setCollection(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCollection(collectionLength);
  }, []);
  
  return collection;
};
