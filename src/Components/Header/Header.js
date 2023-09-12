import React, { useEffect, useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { auth } from '../../firebase/config';
import { listenToAuthChanges } from '../../firebase/AuthDetails';
import { Link } from 'react-router-dom';
import ProfileDetails from '../ProfileDetails/ProfileDetails';



function Header() {

  const [authUser, setAuthUser] = useState(null);
  const [isLoaded , setisLoaded] = useState(false)

  const toggleProfile = () =>{
    setisLoaded(!isLoaded)
  }


  useEffect(() => {
    const user = auth.currentUser;

    const userrr = listenToAuthChanges(auth, setAuthUser); // checking if user is logged in and storing name in authUser.
    console.log("hahahaha ahiahia ahab hbsabs ",userrr);
  }, [])



  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>

        <div className="loginPage">
          {authUser ? (
            <span>{authUser}</span>
          ) : (
            <Link to='/login'>
              <span>Login</span>
            </Link>
          )}
          <i onClick={toggleProfile} class="fa-solid fa-chevron-down"></i>
          {isLoaded && <ProfileDetails />}


          <hr className='line' />
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
