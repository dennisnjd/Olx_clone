import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';

import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

import { auth } from '../../firebase/config';
import { listenToAuthChanges } from '../../firebase/AuthDetails';

function View() {

  const [userDetails, setUserDetails] = useState()
  const [isAddedToFavourite, setIsAddedToFavourite] = useState(false);

  const { postDetails } = useContext(PostContext)
  console.log("Details details ", postDetails);

  const [authUser, setAuthUser] = useState(null);


  useEffect(() => {

    listenToAuthChanges(auth, setAuthUser); // checking if user is logged in and storing name in authUser.
  }, [])


  useEffect(() => {
    const { userId } = postDetails;
    console.log("Details details ", postDetails);


    if (userId !== undefined) {
      const userQuery = query(collection(db, 'users'), where('id', '==', userId));

      getDocs(userQuery)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            // At least one document matches the searchString
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              setUserDetails(doc.data())
              console.log('Matching user data:', userData);
            });
          } else {
            console.log('No matching users found.');
          }
        })
        .catch((error) => {
          console.error('Error querying users:', error);
        });
    } else {
      console.log('searchString is undefined. Handle this case as needed.');
    }

  }, [authUser])


  //function to add to fav products
  const favSubmit = async (e) => {
    e.preventDefault();

    try {
      const objId = userDetails.username + userDetails.id;
      const userRef = doc(db, "favProducts", objId);
      await setDoc(userRef, {
        userId: authUser ? authUser.uid : '',
        name: postDetails.name,
        category: postDetails.category,
        price: postDetails.price,
        city: postDetails.city,
        downloadURL: postDetails.downloadURL,
        createdAt: postDetails.createdAt,
      });
      setIsAddedToFavourite(true)
    } catch (error) {
      console.error("Error uploading favourites:", error);
    }
  };


  return (

    <div className="viewParentDiv">
      {postDetails ? (
        <div className="imageShowDiv">
          <img
            src={postDetails.downloadURL}
            alt=""
          />
        </div>) : (
        <div className="imageShowDiv">
          <img
            src={postDetails.downloadURL}
            alt="NO Imagw available"
          />
        </div>)}
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span className='pdtName'>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
        </div>}

        <div className="addToFavButton">
          <button className="purchasebtn" onClick={favSubmit} disabled={isAddedToFavourite} >
            {isAddedToFavourite ? (
              <>
                Added to Favourite <i className="fa-solid fa-heart"></i>
              </>
            ) : (
              'Add to Favourite'
            )}          </button>
        </div>
      </div>
      {/* </>
      ) : (
        <p>No data</p>
      )}  */}

    </div>
  );
}
export default View;
