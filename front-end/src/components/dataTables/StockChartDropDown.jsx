// HELPERS
import { formatNumber, trendingDown, trendingUp } from "../../helpers/table_helpers";
import PercentChangedHelper from "../../helpers/percentChange";

// HOOKS
import useStockChartData from "../../hooks/useStockChartData";
import useStockInformationSingleCall from "../../hooks/useStockInformationSingleCall";

// STYLES
import "../../styles/stockInfoPages.scss";


export default function StockChartDropDown(props) {

  const { onIntervalChange, interval } = props;


  const dataFromStocks = useStockChartData(props.id);
  const stockInfoData = useStockInformationSingleCall(props.id);
  

  if (!dataFromStocks || !stockInfoData) {
    return <p>Loading...</p>;
  }


  return (
    <>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">
              <button className={interval === 1 ? "btn btn-outline-info active" : "btn btn-outline-info"}
                onClick={() => onIntervalChange(1)}
              >
                1 day
              </button>
            </th>
            <th scope="col">
              <button className={interval === 7 ? "btn btn-outline-info active" : "btn btn-outline-info"}
                onClick={() => onIntervalChange(7)}
              >
                7 day
              </button>
            </th>
            <th scope="col">
              <button className={interval === 14 ? "btn btn-outline-info active" : "btn btn-outline-info"}
                onClick={() => onIntervalChange(14)}
              >
                14 day
              </button>
            </th>
            <th scope="col">
              <button className={interval === 30 ? "btn btn-outline-info active" : "btn btn-outline-info"}
                onClick={() => onIntervalChange(30)}
              >
                30 day
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={PercentChangedHelper(dataFromStocks?.data[0]?.regularMarketPrice, dataFromStocks?.data[0]?.previousClose) >= 0 ? 'positive' : 'negative'}>
              {PercentChangedHelper(dataFromStocks?.data[0]?.regularMarketPrice, dataFromStocks?.data[0]?.previousClose) >= 0 ? trendingUp : trendingDown} {dataFromStocks?.data[0]?.percentChange} <br />
              %{formatNumber(PercentChangedHelper(dataFromStocks?.data[0]?.regularMarketPrice, dataFromStocks?.data[0]?.previousClose))}
            </td>
            <td className={-2.22 >= 0 ? 'positive' : 'positive'}>
              {1.46 >= 0 ? trendingUp : trendingDown}
              <br />
              %0.89
            </td>
            <td className={-1.32 >= 0 ? 'positive' : 'positive'}>
              {1.46 >= 0 ? trendingUp : trendingDown}
              <br />
              %1.32
            </td>
            <td className={1.46 >= 0 ? 'positive' : 'negative'}>
              {1.46 >= 0 ? trendingUp : trendingDown}
              <br />
              %2.22
            </td>
          </tr>
        </tbody>
      </table>
      <div className="dropdown-details">
        Country: {stockInfoData?.data[0]?.country}
        <br />
        <br />
        Industry: {stockInfoData?.data[0]?.industry}
        <br />
        <br />
        Sector: {stockInfoData?.data[0]?.sector}
        <br />
        <br />
        <a href={`${stockInfoData?.data[0]?.website}`} target="_blank" rel="noopener noreferrer" style={{color: "#ffc107"}}>
          <strong>
          {stockInfoData?.data[0]?.website}
          </strong>
        </a>
        <br />
        <br />
      </div>
    </>
  );
}

