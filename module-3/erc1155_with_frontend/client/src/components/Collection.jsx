import NftCard from "@/components/NftCard";
import styles from "@/styles/Home.module.css";

export default function Collection({collection, itemData, mintHandler}) {
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
    <div className={styles.grid}>
      {collection.map((item, i) => (
        <NftCard
          key={i}
          metadata={createMetadata(item, i)}
          mintHandler={mintHandler}
        />
      ))}
    </div>
  );
}
