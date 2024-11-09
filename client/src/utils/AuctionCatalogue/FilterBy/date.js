export const filterByDateDesc = (filteredByCategory, auctionsInfo, setFilteredByDate) => {
    const result = filteredByCategory ? filteredByCategory : [...auctionsInfo];
    const sortedResult = result.sort((a, b) => new Date(b.end_time) - new Date(a.end_time));
    setFilteredByDate([...sortedResult]);
  }

export const filterByDateAsc = (filteredByCategory, auctionsInfo, setFilteredByDate) => {
    const result = filteredByCategory ? filteredByCategory : [...auctionsInfo];
    const sortedResult = result.sort((a, b) => new Date(a.end_time) - new Date(b.end_time));
    setFilteredByDate([...sortedResult]);
  }