import React, { useState } from "react";
import Mission from "../Mission/Mission";

const Search = ({
  filteredLaunches,
  setFilteredLaunches,
  fetchData,
  setIndex,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    setSearchInput(searchTerm);

    const filteredItems = filteredLaunches.filter((launch) =>
      launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!searchTerm.length) {
      setFilteredLaunches(fetchData);
    } else {
      setFilteredLaunches(filteredItems);
    }
  };

  return (
    <>
      <div className="flex justify-center sticky top-0 w-[100%] bg-slate-100 p-5">
        <input
          className="md:w-[25vw] border-slate-400 border-[1px] p-1 rounded-md w-[60vw]"
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          value={searchInput}
        />
      </div>
      <div className="flex flex-col items-center">
        <ul>
          {filteredLaunches.map((launch, index) => (
            <li key={index}>
              <Mission details={launch} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Search;
