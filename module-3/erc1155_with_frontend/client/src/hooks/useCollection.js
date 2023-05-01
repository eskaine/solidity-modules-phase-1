export const useCollection = (collection, itemData) => {
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

  return { createMetadata };
};
