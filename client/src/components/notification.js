import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../components/component_css/Notification.css";
import { useUser } from "../userContext";
import { ArrowsClockwise } from "@phosphor-icons/react";

const RequestList = () => {
  const [requestFollower, setRequestFollower] = useState([]);
  const { user } = useUser();

  const fetchRequestFollower = () => {
    fetch(
      `http://localhost:8000/api/followapi/viewFollowRequests?username=${user.username}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRequestFollower(data.message);
      })
      .catch((error) => console.error("Fetching error:", error));
  };

  const handleFollowRequest = async (sender, receiver, accept) => {
    const queryParams = new URLSearchParams({
      sender,
      receiver,
      accept: accept.toString(),
    }).toString();
    const url = `http://localhost:8000/api/followapi/handleFollowRequest?${queryParams}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Include any other headers like Authorization if needed
        },
      });

      // Handle success or error based on the response
      if (response.ok) {
        console.log("Success:", response.message);
        fetchRequestFollower();
      } else {
        console.error("Error:", response.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Fetch data only once when the component mounts
  useEffect(() => {
    fetchRequestFollower();
  }, []);

  //there might be stuff to change here ask daniel later
  function createImageObjectURL(userProfile) {
    const byteArray = new Uint8Array(userProfile.profilePicture.buffer.data);
    const blob = new Blob([byteArray], {
      type: userProfile.profilePicture.mimetype,
    });
    const imageObjectURL = URL.createObjectURL(blob);
    return imageObjectURL;
  }

  return (
    <nav className="Notification-container">
      <ul className="request-list">
        <li key="refresh" className="row-refresh-border">
          <button
            onClick={fetchRequestFollower}
            className="refresh-button-notification"
          >
            <ArrowsClockwise className="refresh-icon" />
          </button>
        </li>
        {requestFollower.map((requestedUser, index) => {
          console.log(requestedUser);
          return (
            <li key={index} className="notification-row">
              <NavLink
                to={`/profile/${requestedUser.username}`}
                className="notification-nav-link"
              >
                <div id="notification-profilePicture-container">
                  <img
                    className="notification-profilePicture"
                    src={createImageObjectURL(requestedUser)}
                    alt={requestedUser.username}
                  />
                </div>
                <div id="username" className="notification-user">
                  {requestedUser.username}
                </div>
              </NavLink>
              <div id="notification-button-container">
                <button
                  className="acceptAndReject-button accept-button"
                  onClick={() =>
                    handleFollowRequest(
                      requestedUser.username,
                      user.username,
                      true
                    )
                  }
                >
                  accept
                </button>
                <button
                  className="acceptAndReject-button reject-button"
                  onClick={() =>
                    handleFollowRequest(
                      requestedUser.username,
                      user.username,
                      false
                    )
                  }
                >
                  reject
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default RequestList;
