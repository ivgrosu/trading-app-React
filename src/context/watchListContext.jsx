import { createContext, useState, useEffect } from "react";
export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem("watchList")) || ["GOOGL", "MSFT", "AMZN"]
  );

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  const addStock = (stock) => {
    watchList.indexOf(stock) === -1 && setWatchList([...watchList, stock]);
  };

  const deleteStock = (stock) => {
    setWatchList(watchList.filter((item) => item !== stock));
  };

  return (
    <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
