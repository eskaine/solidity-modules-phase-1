export const COLLECTION_LENGTH = 7;
export const INFURA_API = "https://esk-erc1155.infura-ipfs.io/ipfs/Qma7FEp5pG3my56RyAjsVjEBs6QAaXXEStusydhxkJmiGR/metadata/";
export const FORGER_ADDRESS = "0x4e972Bd4c30976EBBc78bA0d26Ba76798C01aCd9";
export const COLLECTION_ADDRESS = "0xFa4a5B6ADD649eD99c00Cd60Cb5f82978cd018C7";
export const COOLDOWN = 60000;
export const COOLDOWN_TICK = 1000;
export const POLYGON_API="https://api-testnet.polygonscan.com/api"; 
export const MUMBAI_ID_HEX = "0x13881";
export const POLYGON_DECIMALS = 18;
export const OPENSEA_URL = "https://testnets.opensea.io/"

// Notification message
export const MINT_SUCCESS_MSG = "Item minted successfully!";
export const MINT_ERROR_MSG = "Not enough items to mint!";
export const BURN_SUCCESS_MSG = "Item burned successfully!";
export const BURN_ERROR_MSG = "Failure to burn item!";
export const TRADE_SUCCESS_MSG = "Item traded successfully!";
export const TRADE_ERROR_MSG = "Failure to trade item!";

export const POLYGON_MUMBAI_NETWORK = {
    chainId: MUMBAI_ID_HEX,
    chainName: "Mumbai Testnet",
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
    nativeCurrency: {
      name: "Polygon",
      symbol: "MATIC",
      decimals: POLYGON_DECIMALS,
    },
    blockExplorerUrls: ["https://mumbai.polygonscan.com"]
};
