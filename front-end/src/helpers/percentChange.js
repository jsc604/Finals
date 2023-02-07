const percentChangedHelper = function(prevClose, currentMarketPrice) {
  return ((currentMarketPrice - prevClose) / prevClose) * 100;
};