import Head from "next/head";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import { Box } from "@mui/material";
import Collection from "@/components/Collection";
import Notification from "@/components/Notification";
import CooldownAlert from "@/components/CooldownAlert";
import SelectionModal from "@/components/SelectionModal";

import { useModal } from "@/hooks/useModal";
import { useIpfs } from "@/hooks/useIpfs";
import { useForger } from "@/hooks/useForger";
import { useNotification } from "@/hooks/useNotification";
import { useCooldown } from "@/hooks/useCooldown";
import { COLLECTION_LENGTH } from "@/utils/constants";
import { MINT_SUCCESS_MSG, MINT_ERROR_MSG } from "@/utils/constants";
import { BURN_SUCCESS_MSG, BURN_ERROR_MSG } from "@/utils/constants";
import { TRADE_SUCCESS_MSG, TRADE_ERROR_MSG } from "@/utils/constants";
import { flexCenterStyle } from "@/styles/styles";

const mainStyle = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
};

export default function Home() {
  const collection = useIpfs(COLLECTION_LENGTH);
  const { isAlert, setAlert, alertMessage, setMessage, isSuccess, setSuccess } =
    useNotification();
  const { open, modalData, handleOpen, handleClose } = useModal();
  const { itemData, forgeItem, burnItem, tradeItem } = useForger();
  const { cooldown, cdAlert, setCooldownAlert } = useCooldown();

  async function mintHandler(id) {
    const res = await forgeItem(id);

    if (!isNaN(res)) {
      setCooldownAlert(true, res);
    } else {
      setMessage({
        success: MINT_SUCCESS_MSG,
        error: MINT_ERROR_MSG,
      });
      setSuccess(res);
      setAlert(true);
    }
  }

  async function burnHandler(id) {
    const res = await burnItem(id);
    setMessage({
      success: BURN_SUCCESS_MSG,
      error: BURN_ERROR_MSG,
    });
    setSuccess(res);
    setAlert(true);
  }

  async function tradeHandler(id, tradeWithId) {
    const res = await tradeItem(id, tradeWithId);
    setMessage({
      success: TRADE_SUCCESS_MSG,
      error: TRADE_ERROR_MSG,
    });
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
      <main>
        <Box sx={mainStyle}>
          <SelectionModal
            open={open}
            modalData={modalData}
            selection={{ collection, itemData }}
            handleClose={handleClose}
            callback={tradeHandler}
          />
          <Notification
            isAlert={isAlert}
            isSuccess={isSuccess}
            alertMessages={alertMessage}
            alertCallback={() => setAlert(false)}
          />
          <CooldownAlert
            cooldown={cooldown}
            isAlert={cdAlert}
            alertCallback={() => setCooldownAlert(false)}
          />
          <Navbar />
          <Box sx={flexCenterStyle}>
            <Collection
              collection={collection}
              itemData={itemData}
              handlers={{
                mintHandler,
                burnHandler,
                openModalHandler: handleOpen,
              }}
            />
          </Box>

          <Footer />
        </Box>
      </main>
    </>
  );
}
