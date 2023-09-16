import React, { useEffect, useState, useRef } from 'react'
import "./MyAdds.css"
import { auth } from '../../firebase/config';
import { listenToAuthChanges } from '../../firebase/AuthDetails';


import { doc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from "firebase/storage";

import { db, storage } from '../../firebase/config';


function MyAdds() {

    const [authUser, setAuthUser] = useState(null);
    const [myAddDetails, setMyAddDetails] = useState([])

    useEffect(() => {

        listenToAuthChanges(auth, setAuthUser); // checking if user is logged in and storing name in authUser.
    }, []);

    let userid = authUser ? authUser.uid : null;

    useEffect(() => {

        if (userid) {
            const userQuery = query(collection(db, 'products'), where('userId', '==', userid));

            getDocs(userQuery)
                .then((querySnapshot) => {
                    const arrayOfObjects = [];

                    if (!querySnapshot.empty) {
                        // At least one document matches the searchString
                        querySnapshot.forEach((doc) => {

                            arrayOfObjects.push(doc.data());

                            const userData = arrayOfObjects;
                            setMyAddDetails(arrayOfObjects)
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

        // const img = imgRef.current;
        // const title = titleRef.current;
        // const purchase = purchaseRef.current;
        // title.style.transform = "translateZ(0px)";
        // img.style.transform = "translateZ(0px) rotateZ(0deg)";
        // purchase.style.transform = "translateZ(0px)";

    }

    function deleteProduct(name, created, dwnldurl) {

        console.log("Passed name is :", name);
        console.log("Passed date is :", created);


        if (!name) {
            return;
        }

        const q = query(collection(db, 'products'), where('name', '==', name), where('createdAt', '==', created));

        // Create a reference to the file using the download URL
        const fileRef = ref(storage, dwnldurl);

        // Delete the file
        deleteObject(fileRef)
            .then(() => {
                // File deleted successfully
                console.log("File deleted successfully.");
            })
            .catch((error) => {
                // Uh-oh, an error occurred
                console.error("Error deleting file:", error);
            });


        getDocs(q)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const docRef = doc.ref; // Get the document reference
                    deleteDoc(docRef); // Delete the document
                    setMyAddDetails((prevData) => prevData.filter((item) => item.name !== name && item.createdAt !== created));

                });
            })
            .catch((error) => {
                console.error('Error deleting documents:', error);
            });
    }



    return (


        <div className="myAddContainer">

            {myAddDetails.map((obj, index) => {

                return <div>

                    <div
                        key={index}
                        className="cardd"
                        ref={cardRef}
                        style={{
                            transform: `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`,
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
                        <p ref={descRef}>
                            Category : {obj.category}
                        </p>

                        <div className="button-box" ref={purchaseRef}>
                            <button className="purchase" onClick={() => obj ? deleteProduct(obj.name, obj.createdAt, obj.downloadURL) : console.log("No Object")} >
                                Mark as Sold
                            </button>
                        </div>
                    </div>
                </div>
            })
            }
        </div>


    )
}

export default MyAdds;
