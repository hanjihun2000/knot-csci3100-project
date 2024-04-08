import React, { useState } from 'react';
import Sidebar from '../SidebarComp/Sidebar';
import Navbar from '../Navbar';
import ProfileSideBarEdit from '../SidebarComp/ProfileSideBar';
import FriendLists from '../friendlist';
import '../component_css/MainPage.css';
import CreatePostForm from './CreatePostForm';





const MainPageEdit = () => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  return (
    <div className="main-container">
      <Navbar className="navBar" isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="content-container">
        <Sidebar className="sideBar" isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="main-content">
          
           
            <CreatePostForm/>
          
          
        </div>
          <FriendLists className="friend-list"/>
      </div>
    </div>
  );
}

export default MainPageEdit;