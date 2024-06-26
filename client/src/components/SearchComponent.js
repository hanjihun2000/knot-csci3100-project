import { NavLink } from "react-router-dom/cjs/react-router-dom";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./component_css/SearchComponent.css";

const SearchPage = () => {
  const [searchUsersList, setSearchUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    history.push(`/search/${searchTerm}`); // Navigate to the search page
  };

  const fetchSearchList = () => {
    fetch(
      `http://localhost:8000/api/userapi/searchUsers?searchTerm=${searchTerm}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else if (response.message === "No users found") {
          return setSearchUsers([]);
        }
        return response.json();
      })
      .then((data) => {
        data.map((user) => {
          const byteArray = new Uint8Array(user.profilePicture.buffer.data);
          const blob = new Blob([byteArray], {
            type: user.profilePicture.mimetype,
          });
          user.profilePicture.buffer = URL.createObjectURL(blob);
        });
        setSearchUsers(data);
      })
      .catch((error) => console.error("Fetching error:", error));
  };

  useEffect(() => {
    if (!searchTerm) {
      // Handle the case where there is no searchTerm
      setSearchUsers([]);
    } else {
      // Handle the case where there is a searchTerm
      fetchSearchList();
    }
  }, [searchTerm]);

  return (
    <div className="search-page">
      <form onSubmit={handleSearch} className="search-container">
        <input
          type="text"
          placeholder="Search for usernames..."
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="search-input"
        />
      </form>
      <div className="results-container">
        {!searchTerm ? (
          <p>Type something to find new friends</p>
        ) : searchUsersList && searchUsersList.length > 0 ? (
          searchUsersList.map((user) => (
            <div key={user.username} className="user-card">
              <NavLink
                to={`/profile/${user.username}`}
                className="profile-link"
              >
                <div className="center-container">
                  <img
                    src={user.profilePicture.buffer}
                    alt={user.username}
                    className="profile-picture-search"
                  />
                  <span className="search-username">{user.username}</span>
                </div>
              </NavLink>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
        .
      </div>
    </div>
  );
};

export default SearchPage;
