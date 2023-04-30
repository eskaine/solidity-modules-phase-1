import Head from "next/head";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import { Box } from "@mui/material";
import Collection from "@/components/Collection";
import Notification from "@/components/Notification";
import CooldownAlert from "@/components/CooldownAlert";

import { useMetaMask } from "metamask-react";
import { useIpfs } from "@/hooks/useIpfs";
import { useEthers } from "@/hooks/useEthers";
import { useNotification } from "@/hooks/useNotification";
import { useCooldown } from "@/hooks/useCooldown";
import { flexCenterStyle } from "@/styles/styles";
import { COLLECTION_LENGTH } from "@/utils/constants";

const mainStyle = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export default function Home() {
  const collection = useIpfs(COLLECTION_LENGTH);
  const { isAlert, setAlert, isSuccess, setSuccess } = useNotification();
  const { connect, account } = useMetaMask();
  const { itemData, forgeItem } = useEthers(account);
  const { isRunning, cooldown, startCooldown, cdAlert, setCooldownAlert } = useCooldown();

  async function mintHandler(id) {
    if (!isRunning) {
      const res = await forgeItem(id);
      setSuccess(res);
      setAlert(true);
      if (res) {
    console.log('run x');

    startCooldown();
      }
    } else {
      setCooldownAlert(true);
    }
  }

  return (
    <>
      <Head>
        <title>ERC1155 Game Items</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box sx={mainStyle}>
          <Navbar account={account} connect={connect} />

          <Box sx={flexCenterStyle}>
            <Notification
              isAlert={isAlert}
              isSuccess={isSuccess}
              alertCallback={() => setAlert(false)}
            />
            <CooldownAlert
              cooldown={cooldown}
              isAlert={cdAlert}
              alertCallback={() => setCooldownAlert(false)}
            />
            <Collection
              account={account}
              collection={collection}
              itemData={itemData}
              mintHandler={mintHandler}
            />
          </Box>

          <Footer />
        </Box>
      </main>
    </>
  );
}
