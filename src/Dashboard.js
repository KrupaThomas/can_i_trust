import React from 'react';
import ReactDOM from 'react-dom';
import { getAuth, signOut } from "firebase/auth";
import { app, db } from './firebaseConfig';
import { setDoc, collection, doc , getDocs, getDoc } from "firebase/firestore"; 
import { Navigate, useNavigate } from "react-router-dom";
import { useState,  useEffect } from 'react';
import { Loading } from './Loading';

function Dashboard() {    
    const auth = getAuth(app);
    const user = auth.currentUser;
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState();
    const [photoURL, setPhotoURL] = useState();
    const [upi, setUpi] = useState();
    const [transactionMethod, setTransactionMethod] = useState();
    const [desc, setDesc] = useState();

    async function saveUser(){
        const userDocRef = doc(db, 'users', user.uid);
        const data = {
            transactionMethod: document.getElementById('transactionMethod').value,
            upi: document.getElementById('upi').value,
            desc: document.getElementById('desc').value,
            name: user.displayName
        }
        await setDoc(userDocRef, data).then((doc) => {
            alert('Saved')
        }).catch((error) => {
            alert(error);
        });
    }
    

    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            navigate("/login");
        }else{
            setDisplayName(user.displayName);
            setPhotoURL(user.photoURL);
            const userDocRef = doc(db, 'users', user.uid);
            await getDoc(userDocRef).then((doc) => {
                setUpi(doc.data().upi);
                setTransactionMethod(doc.data().transactionMethod);
                setDesc(doc.data().desc);
            }).catch((error) => {
                alert(error)
            })
        }
    });

    function _signOut(){
        signOut(auth)
    }
    return (
    <div className='d-flex '>
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark vh-100" id="sidebar">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Dashboard</span>
            </a>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="/dashboard" className="nav-link active" aria-current="page">
                        <i className='fa fa-user me-2'></i> Profile
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/edit-products" className="nav-link" aria-current="page">
                        <i className='fa fa-box-open me-2'></i> Products
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className='fa fa-money-check-alt me-2'></i>  Transactions
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className='fa fa-info-circle me-2'></i>  Help
                    </a>
                </li>
            </ul>
            <hr/>
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={photoURL} alt="" width="32" height="32" className="rounded-circle me-2"/>
                    <strong>{displayName}</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><a className="dropdown-item" href="#">Help</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" onClick={_signOut} >Sign out</a></li>
                </ul>
            </div>
        </div>
        <div className='container m-5 px-5 w-100'>
            <div className="form-floating mx-5">
                <select className="form-control bg-dark text-white" id="transactionMethod" value={transactionMethod}>
                    <option value="upi">UPI</option>
                    <option value="network">Network Banking</option>
                    <option value="card">Card</option>
                </select>
                <label htmlFor="transactionMethod"><i className='fa fa-server me-1'></i> Transaction Method</label>
            </div>
            <div className="form-floating mt-3 mx-5">
                <input type="email" className="form-control bg-dark text-white" id="upi" placeholder="name@example.com" value={upi}/>
                <label htmlFor="upi"><i className='fa fa-money-check-alt me-1'></i> UPI</label>
            </div>
            <div className="form-floating mt-3 mx-5">
                <input type="email" className="form-control bg-dark text-white" id="desc" placeholder="name@example.com" />
                <label htmlFor="desc"><i className='fa fa-info-circle me-1'></i> Description</label>
            </div>
            <button className='btn btn-primary mt-3 mx-5' onClick={saveUser}>Save</button>
        </div>
    </div>
    );


}

export default Dashboard;
