import { useState, useEffect } from "react";
import { Form, useNavigate, useRouteLoaderData } from "react-router-dom";
import finnHub from "../utils/apis/finnHub";

const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const uid = useRouteLoaderData("root");
  const navigate = useNavigate();

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
          const data = response.data.result.filter(
            (item) => !item.symbol.includes(".")
          );

          setResults(data);
        }
      } catch (err) {}
    };

    search.length > 0 ? fetchData() : setResults([]);

    return () => (isMounted = false);
  }, [search]);

  const renderDropdown = () => {
    const dropdownClass = search ? "show" : "";

    return (
      <>
        {uid && (
          <ul
            style={{
              height: "400px",
              overflowY: "scroll",
              overflowX: "hidden",
              cursor: "pointer",
            }}
            className={`dropdown-menu ${dropdownClass}`}
          >
            {results.length > 0 &&
              results.map((result) => {
                return (
                  <li className="dropdown-item p-0" key={result.symbol}>
                    <Form method="post" action="/">
                      <button
                        className="w-100 border-0 "
                        type="submit"
                        name="add"
                        value={result.symbol}
                        onClick={() => setSearch("")}
                      >
                        {result.description} {result.symbol}
                      </button>
                    </Form>
                  </li>
                );
              })}
          </ul>
        )}
      </>
    );
  };

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "rgba(145,158,171,0.04)" }}
          id="search"
          type="text"
          className="form-control bg-white"
          placeholder={uid ? "Search" : "Please log in first"}
          autoComplete="off"
          value={search}
          onChange={(e) => {
            if (!uid) {
              navigate("/login");
            }
            setSearch(e.target.value);
          }}
          data-toggle="tooltip"
          data-placement="bottom"
          title="You can only access data for the US market"
        />
        <label htmlFor="search">{uid ? "Search" : "Please log in first"}</label>
        {renderDropdown()}
      </div>
    </div>
  );
};
export default AutoComplete;
