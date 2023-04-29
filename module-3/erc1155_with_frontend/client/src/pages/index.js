import Head from "next/head";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import styles from "@/styles/Home.module.css";
import NftCard from "@/components/NftCard";
import { useIpfs } from "@/hooks/useIpfs";
import { useWallet } from "@/hooks/useWallet";
import { useEthers } from "@/hooks/useEthers";
import { COLLECTION_LENGTH, ITEM_REQUIREMENTS } from "@/utils/constants";

export default function Home() {
  const requiredItems = ITEM_REQUIREMENTS;
  const collection = useIpfs(COLLECTION_LENGTH);
  const { account, connectMetamask } = useWallet();
  const { playerData } = useEthers(account);

  function parsedRequiredItems(items) {
    return items.map((item) => collection[item].name);
  }

  return (
    <>
      <Head>
        <title>ERC1155 Game Items</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar account={account} connect={connectMetamask} />

        <div className={styles.content}>
          <div className={styles.grid}>
            {collection.map((item, i) => (
              <NftCard
                key={i}
                name={item.name}
                image={item.image}
                requires={parsedRequiredItems(requiredItems[i])}
                amount={playerData[i]}
              />
            ))}
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
