import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import logo from "../assets/images/user-group-solid.svg";
import logo2 from "../assets/images/building-solid.svg";
import logo4 from "../assets/images/location-dot-solid.svg";
import logo5 from "../assets/images/paperclip-solid.svg";
import logo6 from "../assets/images/twitter-brands.svg";

function Sidebar() {
  const [userInfo, setUserInfo] = useState([]);
  const [newUserInfo, setNewUserInfo] = useState([]);
  const [editOpen, setEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    company: "",
    location: "",
    blog: "",
    twitter_username: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`https://api.github.com/users/Praneshchaa`);
      console.log(data);
      setUserInfo([data.data]);
      setFormData(data.data);
    };
    fetchData();
  }, [setUserInfo]);

  const changeEditState = () => {
    setEditOpen(!editOpen);
    console.log(editOpen);
  };

  const sendEditData = () => {
    console.log(formData);
    axios({
      method: "patch",
      url: "https://api.github.com/user",
      data: {
        name: formData.name,
        bio: formData.bio,
        company: formData.company,
        location: formData.location,
        blog: formData.blog,
        twitter_username: formData.twitter_username,
      },
      headers: {
        Authorization: "Bearer " + "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",
      },
    }).then((res) => {
      setUserInfo([res.data]);
      //setFormData(res.data);
      setEditOpen(false);

      console.log(newUserInfo, "userInfo");
    });
  };

  return (
    <div className="sidebar">
      {userInfo.map((info) => (
        <>
          <div className="image">
            <img src={info.avatar_url} alt="pranesh" />
          </div>

          <div className="user-description">
            <div className="user-name">
              <p>{info.name}</p>
            </div>
            <div className="user-username">
              <p>{info.login}</p>
            </div>

            {/* <div className="user-slug"></div> */}
            <button onClick={changeEditState} className="EditButton">
              Edit Profile
            </button>
            <div className="side-info">
              {editOpen ? (
                <>
                  <div>
                    <input
                      className="name-only"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="name"
                      defaultValue={info.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <textarea
                      className="bio-data"
                      type="text"
                      name="bio"
                      id="bio"
                      placeholder="bio"
                      defaultValue={info.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                    />
                  </div>
                  <div className="doUpdate">
                    <img className="logo" src={logo2} alt="logo"></img>
                    <input
                      className="name"
                      type="text"
                      name="company"
                      id="company"
                      placeholder="company"
                      defaultValue={info.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                  <div className="doUpdate">
                    <img className="logo" src={logo4} alt="logo"></img>
                    <input
                      className="name"
                      type="text"
                      name="location"
                      id="location"
                      placeholder="location"
                      defaultValue={info.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>

                  <div className="doUpdate">
                    <img className="logo" src={logo5} alt="logo"></img>
                    <input
                      className="name"
                      type="text"
                      name="blog"
                      id="blog"
                      placeholder="website"
                      defaultValue={info.blog}
                      onChange={(e) =>
                        setFormData({ ...formData, blog: e.target.value })
                      }
                    />
                  </div>
                  <div className="doUpdate">
                    <img className="logo" src={logo6} alt="logo"></img>
                    <input
                      className="name"
                      type="text"
                      name="twitterUsername"
                      id="twitterUsername"
                      placeholder="twitterUsername"
                      defaultValue={info.twitter_username}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          twitter_username: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button onClick={() => sendEditData()} className="update">
                    Update
                  </button>
                </>
              ) : (
                <div>
                  <div className="follower-info">
                    <img className="logo" src={logo} alt="logo"></img>
                    <p className="followers">{info.followers} Followers</p> .
                    <p className="following">{info.following} Following</p>
                  </div>
                  <div className="user-company">
                    <img className="logo" src={logo2} alt="logo"></img>
                    <p>{info.company}</p>
                  </div>
                  <div className="user-location">
                    <img className="logo" src={logo4} alt="logo"></img>
                    <p>{info.location}</p>
                  </div>

                  <div className="user-blog">
                    <img className="logo" src={logo5} alt="logo"></img>
                    <p>{info.blog}</p>
                  </div>

                  <div className="user-location">
                    <img className="logo" src={logo6} alt="logo"></img>
                    <p>{info.twitter_username}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default Sidebar;
