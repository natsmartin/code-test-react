import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
// import Mission from "./components/Mission/Mission";
import { getLaunches } from "./api/SpaceXAPI";
import Spinner from "./components/Spinner/Spinner";
import Search from "./components/Search/Search";

function App() {
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [fetchData, setFetchData] = useState([]); 
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const loaderRef = useRef(null);

  const fetchLaunches = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    const response = await getLaunches(index);
    console.log(response);

    if (response.length === 0) {
      setError("Error fetching data from server!");
    } else {
      setError("");
      setFilteredLaunches((prevItems) => [...prevItems, ...response]);
      setIndex((prevIndex) => prevIndex + 1);
    }

    setIsLoading(false);
  }, [index, isLoading]);


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && error === "") {
        fetchLaunches();
      } else {
        setFetchData(filteredLaunches)
      }
    });

    const refCurrent = loaderRef.current

    if (refCurrent) {
      observer.observe(refCurrent);
    }

    return () => {
      if (refCurrent) {
        observer.unobserve(refCurrent);
      }
    };
  }, [error, fetchLaunches, filteredLaunches]);

  return (
    <div>
      <div className="flex flex-col items-center">
        <Search
          filteredLaunches={filteredLaunches}
          setFilteredLaunches={setFilteredLaunches}
          fetchData={fetchData}
          setIndex={setIndex}
        />
        <p className="pb-4">{error && "End of list."}</p>
      </div>
      <div ref={loaderRef}>{isLoading && <Spinner color="blue" />}</div>
    </div>
  );
}

export default App;
