import { useCollection } from "@/hooks/useCollection";
import { Box } from "@mui/material";
import NftCard from "@/components/NftCard";

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(20%, auto))",
  width: "var(--max-width)",
  maxWidth: "100%",
  gap: "30px",
};

export default function Collection({
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
          metadata={createMetadata(item, i)}
          handlers={handlers}
        />
      ))}
    </Box>
  );
}
