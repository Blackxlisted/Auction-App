export const filterByCategory = (category, setFilteredByDate, setFilteredByPrice, auctionsInfo, setFilteredByCategory) => {
    // filter by category resets both date and price filters
    setFilteredByDate(null);
    setFilteredByPrice(null);
    const filteredAuctions = [];
    auctionsInfo.forEach((item) => { // sorting function
      if (item.category === category) {
        filteredAuctions.push(item);
      };
    });
    setFilteredByCategory(filteredAuctions);
  }