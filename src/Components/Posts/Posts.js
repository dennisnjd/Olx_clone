import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';

import { collection, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase/config';
import { Link } from 'react-router-dom';
import { PostContext } from '../../store/PostContext';
import { listenToAuthChanges } from '../../firebase/AuthDetails';


function Posts({ runEffect }) {

  const [authUser, setAuthUser] = useState(null);

  const [products, setProducts] = useState([])
  const { setPostDetails } = useContext(PostContext)




  useEffect(() => {

    if (runEffect) {

      listenToAuthChanges(auth, setAuthUser); // checking if user is logged in and storing name in authUser.

      const querySnapshotPromise = getDocs(collection(db, "products"));

      querySnapshotPromise
        .then((querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          // Now 'data' contains the fetched Firestore data
          setProducts(data);
          console.log("data in firestore", data);
        })
        .catch((error) => {
          console.error("Error fetching Firestore data:", error);
          setProducts(['abcd']); // Handle the error by setting a default value
        });
    }

  }, [runEffect]);



  return (


    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>For you</span>
          <span></span>
        </div>
        <div className="cards">

          {products.map(obj => {
            if (authUser && obj.userId !== authUser.uid) {



              return <div className="card" onClick={() => {
                setPostDetails(obj)
              }}>
                {/* <div className="favorite" onClick={addToFav}>
                {addFav ?<i class="fa-solid fa-heart fa-xl"></i> :<Heart></Heart>  }
                
              </div> */}
                <Link to='/view'>
                  <div className="image">
                    <img src={obj.downloadURL} alt="product Image" />
                  </div>

                  <div className="content">
                    <p className="rate">&#8377; {obj.price}</p>
                    <p className="name"> {obj.name}</p>
                    <span className="kilometer">{obj.city}</span>

                  </div>
                  <div className="date">
                    <span className='dateText'>{obj.createdAt}</span>
                  </div></Link>
              </div>
            }
          })
          }
          {/* </Link> */}

        </div>
      </div>

    </div>
  );
}

export default Posts;
