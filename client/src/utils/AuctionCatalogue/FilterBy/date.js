export const filterByDateDesc = (filteredByCategory, auctionsInfo, setFilteredByDate) => {
    const result = filteredByCategory ? filteredByCategory : [...auctionsInfo]; // if filtered by category then get sorted
    // array, and filter that sorted array
    const sortedResult = result.sort((a, b) => new Date(b.end_time) - new Date(a.end_time)); // sorting function
    setFilteredByDate([...sortedResult]);
  }

export const filterByDateAsc = (filteredByCategory, auctionsInfo, setFilteredByDate) => {
    const result = filteredByCategory ? filteredByCategory : [...auctionsInfo]; // similar implementation as above
    const sortedResult = result.sort((a, b) => new Date(a.end_time) - new Date(b.end_time));
    setFilteredByDate([...sortedResult]);
  }