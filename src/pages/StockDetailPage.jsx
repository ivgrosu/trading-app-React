import finnHub from "../utils/apis/finnHub";
import { StockChart } from "../components/StockChart";
import { StockData } from "../components/StockData";

const formatData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: Math.floor(data.c[index]),
    };
  });
};

const StockDetailPage = () => {
  return (
    <div>
      <div>
        <StockChart />
        <StockData />
      </div>
    </div>
  );
};

export default StockDetailPage;

export const loader = async ({ params }) => {
  const symbol = params.symbol;
  const date = new Date();
  const currentTime = Math.floor(date.getTime() / 1000);
  let oneDay;
  if (date.getDay() === 6) {
    oneDay = currentTime - 2 * 24 * 60 * 60;
  } else if (date.getDay() === 0) {
    oneDay = currentTime - 3 * 24 * 60 * 60;
  } else {
    oneDay = currentTime - 24 * 60 * 60;
  }

  const oneWeek = currentTime - 7 * 24 * 60 * 60;
  const oneYear = currentTime - 365 * 24 * 60 * 60;

  const fetchCandles = async (from, resolution) => {
    const response = await finnHub.get("/stock/candle", {
      params: { symbol, from, to: currentTime, resolution },
    });
    if (response.data.s !== "ok") {
      throw new Response(JSON.stringify({ message: "Could not fetch data" }), {
        status: 500,
      });
    }

    return response;
  };

  const responses = await Promise.all([
    fetchCandles(oneDay, 30),
    fetchCandles(oneWeek, 60),
    fetchCandles(oneYear, "W"),
  ]);

  const chartData = {
    day: formatData(responses[0].data),
    week: formatData(responses[1].data),
    year: formatData(responses[2].data),
  };

  const result = await finnHub.get("/stock/profile2", {
    params: { symbol },
  });

  return { chartData, result };
};
