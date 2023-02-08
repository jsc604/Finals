export default function percentChangedHelper(prevClose, currentMarketPrice) {
  return ((currentMarketPrice - prevClose) / prevClose) * 100;
};