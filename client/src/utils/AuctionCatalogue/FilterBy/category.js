export const filterByCategory = (category, setFilteredByDate, setFilteredByPrice, auctionsInfo, setFilteredByCategory) => {
    setFilteredByDate(null);
    setFilteredByPrice(null);
    const filteredAuctions = [];
    auctionsInfo.forEach((item) => {
      if (item.category === category) {
        filteredAuctions.push(item);
      };
    });
    setFilteredByCategory(filteredAuctions);
  }