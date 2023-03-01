import AutoComplete from "../components/AutoComplete";
import StockList from "../components/StockList";
import firebaseDB from "../utils/apis/firebaseDB";
import finnHub from "../utils/apis/finnHub";
import { json, redirect } from "react-router-dom";
import { getAuthUid } from "../utils/auth";

const StockOverviewPage = () => {
  return (
    <div>
      <AutoComplete />
      <StockList />
    </div>
  );
};
export default StockOverviewPage;

export const loader = async () => {
  const uid = getAuthUid();

  const response = await firebaseDB.get(`users/${uid}.json`);

  if (response.data === null) {
    return json({ status: 404, message: "No data" });
  }

  const stocks = [];
  for (const [id, symbol] of Object.entries(response.data)) {
    stocks.push({ [id]: symbol });
  }

  const responses = await Promise.all(
    stocks.map((stock) => {
      return finnHub.get("/quote", {
        params: {
          symbol: Object.values(stock)[0],
        },
        data: Object.keys(stock)[0],
      });
    })
  );

  const stock = responses.map((response) => {
    return {
      data: response.data,
      symbol: response.config.params.symbol,
      id: response.config.data,
    };
  });

  return stock;
};

export const action = async ({ request }) => {
  let formData = await request.formData();
  let method = await request.method;
  const uid = getAuthUid();

  if (method === "POST") {
    const symbol = formData.get("add");
    await firebaseDB.post(`users/${uid}.json`, JSON.stringify(symbol));
  }

  const stockId = formData.get("delete");
  await firebaseDB.delete(`users/${uid}/${stockId}.json`);

  return redirect("/");
};
