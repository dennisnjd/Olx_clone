import React, {useContext , useEffect, useState} from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';

import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

function View() {

const [userDetails , setUserDetails] = useState()
const {postDetails} = useContext(PostContext)
console.log("Details details ",postDetails);

useEffect(() =>{
const {userId} = postDetails;
console.log("Details details ",postDetails);


if (userId!== undefined) {
  const userQuery = query(collection(db, 'users'), where('id', '==', userId ));

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

},[])



  return (

    <div className="viewParentDiv">
      {postDetails ?(
      <div className="imageShowDiv">
        <img
          src={postDetails.downloadURL}
          alt=""
        />
      </div> ) : (
 <div className="imageShowDiv">
 <img
   src={postDetails.downloadURL}
   alt="NO Imagw available"
 />
</div>      )}
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>YAMAHA R15V3</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
       {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.price}</p> 
        </div> }
      </div>
      {/* </>
      ) : (
        <p>No data</p>
      )}  */}
      
    </div>
  );
}
export default View;
