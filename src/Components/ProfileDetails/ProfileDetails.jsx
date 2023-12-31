import React, { useState, useEffect } from 'react'
import './ProfileDetails.css'
import '../../assets/avatar.png'
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/config';
import { listenToAuthChanges, userSignOut } from '../../firebase/AuthDetails';


function ProfileDetails() {


  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;

    const userrr = listenToAuthChanges(auth, setAuthUser); // checking if user is logged in and storing name in authUser.
    console.log("hahahaha ahiahia ahab hbsabs ", userrr);
  }, [])

  //firebase function for Logout user
  const handleSignOut = () => {
    userSignOut(auth); // Call the function with the Firebase auth object
  };



  return (
    <div className='profileBar'>

      <div className="nameArea">
        <img className='avatarPic' src="https://statics.olx.in/external/base/img/avatar_1.png" alt="avatar pic" />
        <h4>{authUser ? (
          <h4>{authUser.displayName}</h4>
        ) : (
          <>
            <Link to='/login'><h4>Login</h4></Link>
            <hr className='line' />
          </>
        )}</h4>
      </div>
      <div className="editProfile">
        <button className='editProfileButton' type='button'>View and edit profile</button>
      </div>
      <hr />
      <Link to='/myadds'>
        <div className="myAdds">
          <i class="fa-solid fa-check"></i>
          <span>My ADS</span>
        </div>
      </Link>


      <Link to='/favourites'>
        <div className="myAdds">
          <i class="fa-solid fa-heart"></i>
          <span>Favourites</span>
        </div>
      </Link>


      <div className="myAdds">
        <i class="fa-solid fa-gear"></i>
        <span>Settings</span>
      </div>
      <hr />
      <div onClick={handleSignOut} className="myAdds">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Logout</span>
      </div>

    </div>
  )
}

export default ProfileDetails
