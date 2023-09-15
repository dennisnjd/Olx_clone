import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import Heart from '../../assets/Heart';
import './Post.css';

import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config';
import { Link } from 'react-router-dom';
import { PostContext } from '../../store/PostContext';

function Posts() {

  const [products, setProducts] = useState([])
  const { setPostDetails } = useContext(PostContext)

  let navigate = useNavigate();


  // useEffect(async () => {
  //   const querySnapshot = await getDocs(collection(db, "products"));

  //   const data = [];
  //   querySnapshot.forEach((doc) => {
  //     data.push({ id: doc.id, ...doc.data() });
  //   });

  //   // Now 'data' contains the fetched Firestore data

  //   data ? setProducts(data) : setProducts(['abcd']);

  //   console.log("data in firestore", data);

  // }, [])
  useEffect(() => {
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
  }, []);




  return (

    
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {/* <Link to='/view'> */}

            {products.map(obj => {


              return <div className="card" onClick={() => {
                setPostDetails(obj)
                navigate("/view")
              }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
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
                </div>
              </div>

            })
            }
          {/* </Link> */}

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
