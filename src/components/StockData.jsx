import { useLoaderData } from "react-router-dom";

export const StockData = () => {
  const { result } = useLoaderData();
  const stockData = result.data;

  return (
    <div>
      {stockData && (
        <div className="row border bg-white rounded shadow-sm p-4 mt-5">
          <div className="col">
            <div>
              <span className="fw-bold">name: </span>
              {stockData.name}
            </div>
            <div>
              <span className="fw-bold">country: </span>
              {stockData.country}
            </div>
            <div>
              <span className="fw-bold">ticker: </span>
              {stockData.ticker}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">Exchange: </span>
              {stockData.exchange}
            </div>
            <div>
              <span className="fw-bold">Industry: </span>
              {stockData.finnhubIndustry}
            </div>
            <div>
              <span className="fw-bold">IPO: </span>
              {stockData.ipo}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">MarketCap: </span>
              {stockData.ipo}
            </div>
            <div>
              <span className="fw-bold">Shares Outstanding: </span>
              {stockData.shareOutstanding}
            </div>
            <div>
              <span className="fw-bold">url: </span>
              <a href={stockData.weburl}>{stockData.weburl}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
