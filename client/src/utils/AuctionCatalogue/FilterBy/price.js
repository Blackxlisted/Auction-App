export const filterByPriceDesc = (setFilteredByDate, filteredByCategory, auctionsInfo, setFilteredByPrice) => {
    setFilteredByDate(null); // removes date filter
    const result = filteredByCategory ? filteredByCategory : [...auctionsInfo]; // if filtered by category then set auctions
    // array to array filtered by category and then sort that
    
    const sortedResult = result.sort((a, b) => { // sorting function
      const cost_a = a.price >= a?.highest_bid ? a.price : a.highest_bid;
      const cost_b = b.price >= b?.highest_bid ? b.price : b.highest_bid;
      return (
        cost_b - cost_a
      )
    });
    setFilteredByPrice([...sortedResult]);
  };
 
  export const filterByPriceAsc = (setFilteredByDate, filteredByCategory, auctionsInfo, setFilteredByPrice) => {
    setFilteredByDate(null); // similar implementation as above
    const result = filteredByCategory ? filteredByCategory : [...auctionsInfo];
    const sortedResult = result.sort((a, b) => {
      const cost_a = a.price >= a?.highest_bid ? a.price : a.highest_bid;
      const cost_b = b.price >= b?.highest_bid ? b.price : b.highest_bid;
      return (
        cost_a - cost_b
      )
    });
    setFilteredByPrice([...sortedResult]);
  };
