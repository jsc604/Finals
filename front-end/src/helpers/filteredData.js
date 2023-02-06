export default function filteredData(data, minRank, maxRank) {
  return data.filter(item => item.rank >= minRank && item.rank <= maxRank);
};