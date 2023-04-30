import NftCard from "@/components/NftCard";
import { Box } from "@mui/material";

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(20%, auto))",
    width: "var(--max-width)",
    maxWidth: "100%",
    gap: "30px"
}

export default function Collection({account, collection, itemData, mintHandler, burnHandler}) {
  function createMetadata(item, i) {
    const {name, image, requires} = item;
    const requiredItems = requires.map((item) => collection[item].name);

    return {
        id: i,
        name,
        image,
        requires: requiredItems,
        amount: itemData[i]
    };
  }

  return (
    <Box sx={gridStyle}>
      {collection.map((item, i) => (
        <NftCard
          key={i}
          account={account}
          metadata={createMetadata(item, i)}
          mintHandler={mintHandler}
          burnHandler={burnHandler}
        />
      ))}
    </Box>
  );
}
