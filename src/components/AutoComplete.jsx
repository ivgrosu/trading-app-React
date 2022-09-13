import { useState, useEffect, useContext } from "react";
import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/watchListContext";

export const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { addStock } = useContext(WatchListContext);

  const renderDropdown = () => {
    const dropdownClass = search ? "show" : "";
    return (
      <ul
        style={{
          height: "400px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
        className={`dropdown-menu ${dropdownClass}`}
      >
        {results.map((result) => {
          return (
            <li
              className="dropdown-item"
              key={result.symbol}
              onClick={() => {
                addStock(result.symbol);
                setSearch("");
              }}
            >
              {result.description} {result.symbol}
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });
        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (err) {}
    };

    search.length > 0 ? fetchData() : setResults([]);

    return () => (isMounted = false);
  }, [search]);

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "rgba(145,158,171,0.04)" }}
          id="search"
          type="text"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-toggle="tooltip"
          data-placement="bottom"
          title="You can only access data for the US market"
        />
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>
  );
};
