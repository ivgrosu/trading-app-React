import { useLoaderData, useNavigate, Form } from "react-router-dom";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";

const StockList = () => {
  const stock = useLoaderData();
  const navigate = useNavigate();

  const changeColor = (change) => {
    return change > 0 ? "success" : "danger";
  };
  const renderIcon = (value) => {
    return value > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
  };

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`);
  };

  return (
    <>
      {stock.length > 0 ? (
        <div>
          <table
            className="table hover "
            style={{
              maxWidth: "1200px",
              margin: "30px auto 30px auto",
              backgroundColor: "white",
            }}
          >
            <thead style={{ color: "rgb(79,89,102)" }}>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Last</th>
                <th scope="col">Chg</th>
                <th scope="col">Chg%</th>
                <th scope="col">High</th>
                <th scope="col">Low</th>
                <th scope="col">Open</th>
                <th scope="col">Pclose</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((stockData) => {
                return (
                  <tr
                    style={{ cursor: "pointer" }}
                    onClick={() => handleStockSelect(stockData.symbol)}
                    className="table-row"
                    key={stockData.symbol}
                  >
                    <th scope="row">{stockData.symbol}</th>
                    <td>{stockData.data.c}</td>
                    <td className={`text-${changeColor(stockData.data.d)}`}>
                      {stockData.data.d}
                      {renderIcon(stockData.data.d)}
                    </td>
                    <td className={`text-${changeColor(stockData.data.dp)}`}>
                      {stockData.data.dp}
                      {renderIcon(stockData.data.dp)}
                    </td>
                    <td>{stockData.data.h}</td>
                    <td>{stockData.data.l}</td>
                    <td>{stockData.data.o}</td>
                    <td>{stockData.data.pc}</td>
                    <td>
                      <Form method="delete" action="/">
                        <button
                          className="btn btn-danger btn-sm ml-3 d-inline-block delete-button"
                          type="submit"
                          name="delete"
                          value={stockData.id}
                        >
                          Remove
                        </button>
                      </Form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h4 style={{ textAlign: "center" }}>Please search for stock trade!</h4>
      )}
    </>
  );
};

export default StockList;
