import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../components/component_css/FriendList.css';
import { useUser } from '../userContext';
import { ArrowsClockwise } from "@phosphor-icons/react";

const FriendLists = () => {
  const [friendList, setFriendList] = useState([]);
  const { user } = useUser();
  const [fetchTrigger, setFetchTrigger] = useState(false);
  console.log(friendList);
  const fetchFriendList = () => {
    
    fetch(`http://localhost:8000/api/userapi/viewFollowing?username=${user.username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setFriendList(data);
      })
      .catch(error => console.error('Fetching error:', error));
  };

  // Fetch data only once when the component mounts
  useEffect(() => {
    fetchFriendList();
  }, []);

  function createImageObjectURL(userProfile) {
    if (!userProfile.profilePicture || !userProfile.profilePicture.buffer) {
      return 'path/to/default/image.png'; // Fallback if no picture
    }
    
    const byteArray = new Uint8Array(userProfile.profilePicture.buffer.data);
    const blob = new Blob([byteArray], { type: userProfile.profilePicture.mimetype });
    const imageObjectURL = URL.createObjectURL(blob);
    console.log(imageObjectURL);
    return imageObjectURL;
  }

  return (
    <nav className="FriendListsContainer">
      
      <ul className="FriendLists">
        <li key = 'refresh className = "row' className="refresh-border"><button onClick={fetchFriendList} className="refresh-button"><ArrowsClockwise className="reload-icon" /></button></li>
        {friendList.map((friend, index) => {
  // Log the current friend and index to the console
  console.log("Friend: ", friend, "Index: ", index);

  return (
    <li key={index} className="row">
      <NavLink to={`/profile/${friend}`} className="nav-link">
        <div id="profilePicture">
          <img src={createImageObjectURL(friend) || 'path/to/default/image.png'} alt={friend}/>
        </div>
        <div id="username">{friend}</div>
      </NavLink>
    </li>
  );
})}
      </ul>
    </nav>
  );
};

export default FriendLists;
