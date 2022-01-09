import React, { useEffect, useState } from "react";
import axios from "axios";

import "../App.scss";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import logo from "../assets/images/book-open-solid.svg";
import logo2 from "../assets/images/book-solid.svg";
import logo3 from "../assets/images/table-list-solid.svg";

function Repositories() {
  const [allData, setAllData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterType, setFilterType] = useState("none");
  const [filterLangType, setFilterLangType] = useState("none");
  const [sortCategory, setSortCategory] = useState("name");
  const [langOptions, setLangOptions] = useState([]);

  let filterVal = "null";

  useEffect(() => {
    axios("https://api.github.com/users/Praneshchaa/repos")
      .then((response) => {
        console.log(response.data);
        setAllData(response.data);

        //figure out what options to provide for the language filter
        var lo = []; //temp var

        for (var repo of response.data) {
          if (repo.language != null) {
            lo.push(repo.language);
          }
        }

        setLangOptions(lo);
        console.log("Langoptions = ", langOptions);

        //setFilteredData(response.data);
      })
      .catch((error) => {
        console.log("Data Error" + error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };
  const handleFilterType = (event) => {
    setFilterType(event.target.value);
  };

  const handleFilterLangType = (event) => {
    setFilterLangType(event.target.value);
  };

  const handleSortCategory = (event) => {
    setSortCategory(event.target.value);
  };

  const doSearch = (array) => {
    let result = [];
    result = array.filter((data) => {
      return data.full_name.search(searchKeyword) != -1;
    });

    return result;
  };

  //handleFilter for handling filters
  const doFilterType = (array) => {
    let result = [];
    result = array.filter((data) => {
      if (filterType == "none") {
        return true;
      }
      if (filterType == "forks") {
        return data.fork == true;
      }
      if (filterType == "archived") {
        return data.archived == true;
      }

      if (filterType == "public") {
        return data.private == false;
      }

      if (filterType == "private") {
        return data.private == true;
      }

      if (filterType == "mirrors") {
        return data.mirror_url != null;
      }
    });

    console.log("Da result is ", result);
    return result;
    //setFilteredData(result);
  };

  const doFilterLangType = (array) => {
    let result = [];
    if (filterLangType == "none") {
      return array;
    }

    result = array.filter((data) => {
      if (!data.language) {
        return false;
      }
      return data.language.search(filterLangType) != -1;
    });

    return result;
  };

  const doSort = (array) => {
    let result = [];
    //console.log(allData, "k xa ta ");
    if (sortCategory == "none") {
      return array;
    }
    if (sortCategory == "stargazers_count") {
      result = array.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortCategory == "name") {
      //result = allData.sort((a, b) => b.name - a.name);
      result = array.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    } else if (sortCategory == "updated_at") {
      //result = allData.sort((a, b) => b.updated_at - a.updated_at);
      result = array.sort(function (a, b) {
        let date1 = new Date(a.updated_at).getTime();
        let date2 = new Date(b.updated_at).getTime();
        if (date1 < date2) {
          return 1;
        }
        if (date1 > date2) {
          return -1;
        }

        // names must be equal
        return 0;
      });
    }

    return result;
  };

  var returnRenderedItems = (items) => {
    return (
      <div className="repositories-section">
        {items.map((repo) => {
          return (
            <a href={repo.html_url}>
              <div className="single-repo">
                <div className="repo-left">
                  <div className="repo-name">{repo.name}</div>
                  <div className="repo-date">
                    Updated: {""}
                    {new Date(repo.updated_at).toDateString()}
                  </div>

                  <div className={`repo-language ${repo.language}`}>
                    {repo.language}
                  </div>
                </div>
                <div className="repo-right">
                  <div className="repo-visibility">{repo.visibility}</div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <div className="repositories-collection">
      <div className="repositories-selectors" id="test">
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearch}
          className="Selectors"
          placeholder="Find a repository..."
        />

        <select onChange={handleFilterType} className="Dropdowns">
          <option value="none">Types</option>
          <option value="forks">Forks</option>
          <option value="archived">Archived</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="mirrors">Mirrors</option>
        </select>

        <select onChange={handleFilterLangType} className="Dropdowns">
          <option value="none">Language</option>
          {langOptions.map((language) => {
            return <option value={language}>{language}</option>;
          })}
        </select>

        <select onChange={handleSortCategory} className="Dropdowns">
          <option value="none">Sort</option>
          <option value="updated_at">Last updated</option>
          <option value="name">Name</option>
          <option value="stargazers_count">Stars</option>
        </select>
      </div>

      <div id="repositories-section">
        {returnRenderedItems(
          doSearch(doSort(doFilterLangType(doFilterType(allData))))
        )}
      </div>
    </div>
  );
}

export default Repositories;
