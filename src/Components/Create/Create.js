import React, { Fragment, useState, useEffect } from 'react';
import './Create.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { auth, storage ,db} from '../../firebase/config';
import { listenToAuthChanges } from '../../firebase/AuthDetails';

import { useNavigate  } from 'react-router-dom';


const Create = () => {

  const navigate = useNavigate();


  const [authUser, setAuthUser] = useState(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [city , setCity] = useState('')
  const [imgLink, setImgLink] = useState('');

  useEffect(() => {

    listenToAuthChanges(auth, setAuthUser); // checking if user is logged in and storing name in authUser.
  }, [])

  const date = new Date();

  const userId = authUser ? authUser.uid : ''
  const storagePath = `images/photos/${userId}/${date}-${imgLink.name}`;
  const storageRef = ref(storage, storagePath);

  const productSubmit = (e) => {
    e.preventDefault()

    authUser 
    ? (async () => {
      try {
        const snapshot = await uploadBytes(storageRef, imgLink);
        console.log("Image uploaded successfully");

        const downloadURL = await getDownloadURL(storageRef);
        console.log("Download URL:", downloadURL);

        // Store the download URL in your database or use it as needed
        const objId = name + userId;
        const userRef = doc(db, "products", objId);
        await setDoc(userRef, {
          userId: userId,
          name,
          category,
          price,
          city,
          downloadURL,
          createdAt: date.toDateString(),
        });

        navigate("/");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    })()
  : alert('Login to add product');
  }
  



  return (

    <Fragment>
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Product Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="fname"
            name="Name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="fname"
            name="category"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="fname"
            name="Price"
          />
          <br />
          <label htmlFor="fname">City</label>
          <br />
          <input
            className="input"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            id="fname"
            name="City"
          />
          <br />

          <br />
          <img alt="Posts" width="200px" height="200px" src={imgLink ? URL.createObjectURL(imgLink) : ''}></img>
          <br />
          <input onChange={(e) => {
            setImgLink(e.target.files[0])
          }}
            type="file" />
          <br />
          <button onClick={productSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
