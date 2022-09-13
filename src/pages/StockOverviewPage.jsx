import { AutoComplete } from "../components/AutoComplete";
import { StockList } from "../components/StockList";
import { FcNeutralTrading } from "react-icons/fc";

export const StockOverviewPage = () => {
  return (
    <div>
      <div className="text-center mt-5">
        <FcNeutralTrading size={60} />
        <h3 className="mt-2">
          <strong>Trading</strong> <span className="text-muted">Master</span>
        </h3>
      </div>
      <AutoComplete />
      <StockList />
    </div>
  );
};
