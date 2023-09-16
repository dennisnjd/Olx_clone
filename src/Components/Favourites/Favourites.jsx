import React, { useEffect, useState, useRef, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import '../MyAdds/MyAdds.css'

import { auth } from '../../firebase/config';
import { listenToAuthChanges } from '../../firebase/AuthDetails';
import { PostContext } from '../../store/PostContext';



import { doc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';

import { db, storage } from '../../firebase/config';





function Favourites() {


    const [authUser, setAuthUser] = useState(null);
    const [myFavDetails, setMyFavDetails] = useState([])

    const navigate = useNavigate();
    const { setPostDetails } = useContext(PostContext)




    useEffect(() => {

        listenToAuthChanges(auth, setAuthUser); // checking if user is logged in and storing name in authUser.
    }, []);

    let userid = authUser ? authUser.uid : null;

    useEffect(() => {

        if (userid) {
            const userQuery = query(collection(db, 'favProducts'), where('userId', '==', userid));

            getDocs(userQuery)
                .then((querySnapshot) => {
                    const arrayOfObjects = [];

                    if (!querySnapshot.empty) {
                        // At least one document matches the searchString
                        querySnapshot.forEach((doc) => {

                            arrayOfObjects.push(doc.data());

                            const userData = arrayOfObjects;
                            setMyFavDetails(arrayOfObjects)
                            console.log('Matching user data:', userData);
                        });
                    } else {
                        console.log(userid);
                        console.log('No matching users found.');
                    }
                })
                .catch((error) => {
                    console.error('Error querying users:', error);
                });
        } else {
            console.log('searchString is undefined. Handle this case as needed.');
        }

    }, [userid])



    const [xRotation, setXRotation] = useState(0);
    const [yRotation, setYRotation] = useState(0);
    const cardRef = useRef(null);
    const imgRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const purchaseRef = useRef(null);

    function handleMouseMove(event) {
        const card = cardRef.current;
        if (card) {
            const { offsetWidth: width, offsetHeight: height } = card;
            const { clientX, clientY } = event;
            const x = clientX - card.offsetLeft - width / 2;
            const y = clientY - card.offsetTop - height / 2;
            var mult = 20;
            setXRotation((y / height) * mult);
            setYRotation((x / width) * mult);

        }
    }

    function handleMouseLeave() {
        setXRotation(0);
        setYRotation(0);

    }


    //delete products from Favourite list
    function deleteFav(name, created) {

        console.log("Passed name is :", name);
        console.log("Passed date is :", created);


        if (!name) {
            return;
        }

        const q = query(collection(db, 'favProducts'), where('name', '==', name), where('createdAt', '==', created));


        getDocs(q)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const docRef = doc.ref; // Get the document reference
                    deleteDoc(docRef); // Delete the document

                    setMyFavDetails((prevData) => prevData.filter((item) => item.name !== name && item.createdAt !== created));
                    navigate('/favourites')
                });
            })
            .catch((error) => {
                console.error('Error deleting documents:', error);
            });
    }



    return (


        <div className="myAddContainer">

            {myFavDetails.map((obj, index) => {

                return <div>



                    <div>
                        <Link to="/view">
                            <div
                                key={index}
                                className="cardd"
                                ref={cardRef}
                                style={{
                                    transform: `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`,
                                }}
                                onClick={() => {
                                    setPostDetails(obj)
                                }}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img
                                    ref={imgRef}
                                    src={obj.downloadURL}
                                    alt="product Image"
                                    className="sneaaker-img"
                                />
                                <h1 className="title" ref={titleRef}>
                                    {obj.name}
                                </h1>

                                <h3 className="title" ref={titleRef}>
                                    &#8377; {obj.price}
                                </h3>
                                <p ref={descRef} className='categry'>
                                    Category : {obj.category}
                                </p>
                            </div>
                        </Link>

                        <div className="button-box" ref={purchaseRef}>
                            <button className="purchase" onClick={() => obj ? deleteFav(obj.name, obj.createdAt) : console.log("No Object")} >
                                Remove from Favourites
                            </button>
                        </div>
                    </div>

                </div>
            })
            }
        </div >


    )
}

export default Favourites;
