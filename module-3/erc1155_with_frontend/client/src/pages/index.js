import Head from "next/head";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import styles from "@/styles/Home.module.css";
import Collection from "@/components/Collection";
import Notification from "@/components/Notification";

import { useIpfs } from "@/hooks/useIpfs";
import { useWallet } from "@/hooks/useWallet";
import { useEthers } from "@/hooks/useEthers";
import { useNotification } from "@/hooks/useNotification";
import { COLLECTION_LENGTH } from "@/utils/constants";

export default function Home() {
  const collection = useIpfs(COLLECTION_LENGTH);
  const { isAlert, setAlert, isSuccess, setSuccess } = useNotification();
  const { account, connectMetamask } = useWallet();
  const { itemData, mintItem } = useEthers(account);

  async function mintHandler(id) {
    const res = await mintItem(id);
    setSuccess(res);
    setAlert(true);
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
          <Notification isAlert={isAlert} isSuccess={isSuccess} alertCallback={() => setAlert(false)} />
          <Collection collection={collection} itemData={itemData} mintHandler={mintHandler} />
        </div>

        <Footer />
      </main>
    </>
  );
}
