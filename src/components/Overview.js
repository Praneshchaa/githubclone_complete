import React, { useEffect, useState } from "react";
import axios from "axios";

import "../App.scss";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import logo from "../assets/images/book-open-solid.svg";
import logo2 from "../assets/images/book-solid.svg";
import logo3 from "../assets/images/table-list-solid.svg";

function Repositories() {
  const [repoData, setRepoData] = useState([]);

  const fetchRepodata = async () => {
    const data = await axios.get(
      `https://api.github.com/users/praneshchaa/repos`
    );
    console.log(data.data);
    setRepoData(data.data);
    const date = repoData.created_at;
    console.log(date, "date");
  };

  useEffect(() => {
    fetchRepodata();

    return () => {};
  }, []);

  return (
    <div className="repositories-collection">
      <div className="repositories-section">
        {repoData.map((repo) => (
          <a href={repo.html_url}>
            <div className="single-repo">
              <div className="repo-left">
                <div className="repo-name">{repo.full_name}</div>
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

              {/* <div className="repo-right">
                <div className="repo-visibility">{repo.stargazers_count}</div>
              </div> */}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Repositories;
