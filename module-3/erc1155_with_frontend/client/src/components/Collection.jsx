import NftCard from "@/components/NftCard";
import { Box } from "@mui/material";
import { useCollection } from "@/hooks/useCollection";

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(20%, auto))",
  width: "var(--max-width)",
  maxWidth: "100%",
  gap: "30px",
};

export default function Collection({
  account,
  collection,
  itemData,
  handlers,
}) {
  const { createMetadata } = useCollection(collection, itemData);

  return (
    <Box sx={gridStyle}>
      {collection.map((item, i) => (
        <NftCard
          key={i}
          account={account}
          metadata={createMetadata(item, i)}
          handlers={handlers}
        />
      ))}
    </Box>
  );
}
